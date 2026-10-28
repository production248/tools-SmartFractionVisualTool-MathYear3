"""Generate contextual operation-guide narration from FRACTION_GUIDE_COPY."""

from __future__ import annotations

import argparse
import asyncio
import re
from pathlib import Path

import edge_tts


ROOT = Path(__file__).resolve().parents[1]
COPY_PATTERN = re.compile(
    r'^\s*"([^"]+)":\s*guideCopy\("([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)"\),?$',
    re.MULTILINE,
)
VOICES = {
    "bm": "ms-MY-YasminNeural",
    "zh": "zh-CN-XiaoxiaoNeural",
    "en": "en-SG-LunaNeural",
}


def load_jobs() -> list[tuple[str, str, str]]:
    source = (ROOT / "app.js").read_text(encoding="utf-8")
    jobs: list[tuple[str, str, str]] = []
    for match in COPY_PATTERN.finditer(source):
        key, _bm_title, bm_body, _zh_title, zh_body, _en_title, en_body = match.groups()
        jobs.extend((language, key, body) for language, body in {
            "bm": bm_body,
            "zh": zh_body,
            "en": en_body,
        }.items())
    if len(jobs) != 75:
        raise RuntimeError(f"Expected 75 narration jobs, found {len(jobs)}")
    return jobs


async def generate_one(language: str, key: str, text: str, force: bool, semaphore: asyncio.Semaphore) -> None:
    output = ROOT / "assets" / "operation-guide" / "voices" / language / "contextual" / f"{key}.mp3"
    if output.exists() and output.stat().st_size > 1024 and not force:
        return
    output.parent.mkdir(parents=True, exist_ok=True)
    async with semaphore:
        last_error: Exception | None = None
        for attempt in range(3):
            try:
                await edge_tts.Communicate(text, VOICES[language], rate="-10%", pitch="+0Hz").save(str(output))
                print(f"{language}/{key}.mp3")
                return
            except Exception as error:  # network retries are intentional
                last_error = error
                await asyncio.sleep(1.5 * (attempt + 1))
        raise RuntimeError(f"Could not generate {language}/{key}: {last_error}")


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    semaphore = asyncio.Semaphore(5)
    await asyncio.gather(*(generate_one(*job, args.force, semaphore) for job in load_jobs()))


if __name__ == "__main__":
    asyncio.run(main())
