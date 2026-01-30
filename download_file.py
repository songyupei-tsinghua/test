#!/usr/bin/env python3
"""Simple file downloader.

Usage:
    python download_file.py <URL> [<output_path>]

If ``output_path`` is omitted the file will be written to the current
directory using the basename of the URL.  The script streams the content
so it works for large files without loading the entire payload into
memory.
"""

import argparse
import os
from pathlib import Path
from typing import Iterable

import requests


def _stream_download(url: str, dest: Path, chunk_size: int = 8192) -> None:
    """Download ``url`` and write it to ``dest``.

    Parameters
    ----------
    url:
        HTTP/HTTPS URL to fetch.
    dest:
        Destination file path.  The file is created or overwritten.
    chunk_size:
        Size of chunks read from the network.  Default is 8 KiB.
    """
    # ``stream=True`` keeps the connection open and allows us to
    # iterate over the response body.
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with dest.open("wb") as f:
            for chunk in r.iter_content(chunk_size=chunk_size):
                if chunk:  # filter out keep‑alive
                    f.write(chunk)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Download a file from a URL.")
    parser.add_argument("url", help="The URL of the file to download")
    parser.add_argument("output", nargs="?", help="Destination file path")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    url = args.url
    dest = Path(args.output or Path(url).name)
    print(f"Downloading {url} → {dest}")
    _stream_download(url, dest)
    print("Download complete.")


if __name__ == "__main__":
    main()
