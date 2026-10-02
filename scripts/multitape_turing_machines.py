"""Machines, numbers and figures for the Multitape Nondeterministic Turing Machines Project page.

Needs automata-lib 9.2.0 (pip install automata-lib==9.2.0) and Graphviz's dot, on PATH or named by the GRAPHVIZ_DOT
environment variable. Run it from the repository root:

    python scripts/multitape_turing_machines.py

It checks every machine on the page, prints the numbers the page quotes and writes the page's figures to
_includes/multitape-turing-machines/.
"""

import os
import re
import shutil
import subprocess
from itertools import combinations, product
from pathlib import Path

from automata.base.exceptions import RejectionException
from automata.tm.dtm import DTM
from automata.tm.mntm import MNTM

FIGURES = Path(__file__).resolve().parent.parent / "_includes" / "multitape-turing-machines"

# The page's usage example. Tape 2 is a stack: push the first half, guess where the middle is, then pop the stack
# while reading the second half.
palindromes = MNTM(
    states={"q0", "q1", "q2", "q3"},
    input_symbols={"0", "1"},
    tape_symbols={"0", "1", "$", "#"},
    n_tapes=2,
    transitions={
        "q0": {
            ("0", "#"): [("q1", (("0", "N"), ("$", "R")))],
            ("1", "#"): [("q1", (("1", "N"), ("$", "R")))],
            ("#", "#"): [("q3", (("#", "N"), ("#", "N")))],
        },
        "q1": {
            ("0", "#"): [
                ("q1", (("0", "R"), ("0", "R"))),  # push the 0
                ("q2", (("0", "N"), ("#", "L"))),  # the second half starts here
                ("q2", (("0", "R"), ("#", "L"))),  # this 0 is the middle symbol
            ],
            ("1", "#"): [
                ("q1", (("1", "R"), ("1", "R"))),
                ("q2", (("1", "N"), ("#", "L"))),
                ("q2", (("1", "R"), ("#", "L"))),
            ],
        },
        "q2": {
            ("0", "0"): [("q2", (("0", "R"), ("0", "L")))],
            ("1", "1"): [("q2", (("1", "R"), ("1", "L")))],
            ("#", "$"): [("q3", (("#", "N"), ("$", "N")))],
        },
    },
    initial_state="q0",
    blank_symbol="#",
    final_states={"q3"},
)

# One tape: cross off the first symbol, run to the end, check and cross off the last symbol, walk back, repeat.
one_tape = DTM(
    states={"q0", "q1", "q2", "q3", "q4", "q5", "qa"},
    input_symbols={"0", "1"},
    tape_symbols={"0", "1", "#"},
    transitions={
        "q0": {"0": ("q1", "#", "R"), "1": ("q2", "#", "R"), "#": ("qa", "#", "N")},
        "q1": {"0": ("q1", "0", "R"), "1": ("q1", "1", "R"), "#": ("q3", "#", "L")},  # first symbol was 0
        "q2": {"0": ("q2", "0", "R"), "1": ("q2", "1", "R"), "#": ("q4", "#", "L")},  # first symbol was 1
        "q3": {"0": ("q5", "#", "L"), "#": ("qa", "#", "N")},
        "q4": {"1": ("q5", "#", "L"), "#": ("qa", "#", "N")},
        "q5": {"0": ("q5", "0", "L"), "1": ("q5", "1", "L"), "#": ("q0", "#", "R")},
    },
    initial_state="q0",
    blank_symbol="#",
    final_states={"qa"},
)

# Two tapes: copy the input behind a $ on tape 2, move head 2 back to the start, then compare the input read
# backwards (head 1) with the copy read forwards (head 2). No head ever moves left of its first cell.
two_tapes = MNTM(
    states={"q0", "q1", "q2", "q3", "q4", "qa"},
    input_symbols={"0", "1"},
    tape_symbols={"0", "1", "$", "#"},
    n_tapes=2,
    transitions={
        "q0": {
            ("0", "#"): [("q1", (("0", "N"), ("$", "R")))],
            ("1", "#"): [("q1", (("1", "N"), ("$", "R")))],
            ("#", "#"): [("qa", (("#", "N"), ("#", "N")))],
        },
        "q1": {  # copy
            ("0", "#"): [("q1", (("0", "R"), ("0", "R")))],
            ("1", "#"): [("q1", (("1", "R"), ("1", "R")))],
            ("#", "#"): [("q2", (("#", "N"), ("#", "L")))],
        },
        "q2": {  # rewind head 2
            ("#", "0"): [("q2", (("#", "N"), ("0", "L")))],
            ("#", "1"): [("q2", (("#", "N"), ("1", "L")))],
            ("#", "$"): [("q3", (("#", "L"), ("$", "R")))],
        },
        "q3": {  # compare
            ("0", "0"): [("q4", (("0", "N"), ("0", "R")))],
            ("1", "1"): [("q4", (("1", "N"), ("1", "R")))],
        },
        "q4": {  # step head 1 back, or accept once the copy is used up
            **{(a, b): [("q3", ((a, "L"), (b, "N")))] for a in "01" for b in "01"},
            ("0", "#"): [("qa", (("0", "N"), ("#", "N")))],
            ("1", "#"): [("qa", (("1", "N"), ("#", "N")))],
        },
    },
    initial_state="q0",
    blank_symbol="#",
    final_states={"qa"},
)

# The perfect-squares machine from the course's oral exam, as it is in automata's tests (tests/test_tm.py, MIT
# License). It accepts # followed by n^2 zeros, n >= 1. Tape 2 collects the 0s of 1 + 3 + 5 + ..., and tape 3 holds
# the blocks of that sum as alternating runs of X and Y.
perfect_squares = MNTM(
    states=set(["q" + str(i) for i in range(-1, 27)] + ["qc", "qf", "qr"]),
    input_symbols={"0"},
    tape_symbols={"0", "X", "Y", "S", "#"},
    n_tapes=3,
    transitions={
        "q-1": {("#", "#", "#"): [("q0", (("#", "R"), ("#", "N"), ("#", "N")))]},
        "q0": {("0", "#", "#"): [("q1", (("0", "N"), ("#", "R"), ("#", "R")))]},
        "q1": {("0", "#", "#"): [("q2", (("0", "N"), ("0", "R"), ("#", "N")))]},
        "q2": {("0", "#", "#"): [("qc", (("0", "N"), ("#", "L"), ("X", "R")))]},
        "qc": {
            ("0", "0", "#"): [("qc", (("0", "R"), ("0", "R"), ("#", "N")))],  # compare the input with tape 2
            ("0", "#", "#"): [("q3", (("0", "N"), ("#", "N"), ("#", "N")))],  # tape 2 is shorter: continue
            ("#", "#", "#"): [("qf", (("#", "N"), ("#", "N"), ("#", "N")))],  # same length: accept
            ("#", "0", "#"): [("qr", (("#", "N"), ("0", "N"), ("#", "N")))],  # tape 2 is longer: reject
        },
        "q3": {("0", "#", "#"): [("q4", (("0", "N"), ("#", "N"), ("#", "L")))]},
        "q4": {
            ("0", "#", "X"): [("q5", (("0", "N"), ("#", "N"), ("X", "R")))],
            ("0", "#", "Y"): [("q13", (("0", "N"), ("#", "N"), ("Y", "R")))],
        },
        "q5": {
            ("0", "#", "Y"): [("q5", (("0", "N"), ("#", "N"), ("Y", "L")))],
            ("0", "#", "#"): [("q6", (("0", "N"), ("#", "N"), ("Y", "L")))],
        },
        "q6": {
            ("0", "#", "X"): [("q6", (("0", "N"), ("#", "N"), ("X", "L")))],
            ("0", "#", "Y"): [("q7", (("0", "N"), ("#", "N"), ("Y", "R")))],
            ("0", "#", "S"): [("q7", (("0", "N"), ("#", "N"), ("S", "R")))],
            ("0", "#", "#"): [("q24", (("0", "N"), ("#", "N"), ("#", "R")))],
        },
        "q7": {("0", "#", "X"): [("q9", (("0", "N"), ("#", "N"), ("S", "R")))]},
        "q9": {
            ("0", "#", "X"): [("q9", (("0", "N"), ("#", "N"), ("X", "R")))],
            ("0", "#", "Y"): [("q9", (("0", "N"), ("#", "N"), ("Y", "R")))],
            ("0", "#", "#"): [("q10", (("0", "N"), ("#", "N"), ("Y", "L")))],
        },
        "q10": {
            ("0", "#", "Y"): [("q10", (("0", "N"), ("#", "N"), ("Y", "L")))],
            ("0", "#", "X"): [("q6", (("0", "N"), ("#", "N"), ("X", "L")))],
            ("0", "#", "S"): [("q11", (("0", "N"), ("#", "N"), ("X", "L")))],
        },
        "q11": {
            ("0", "#", "S"): [("q11", (("0", "N"), ("#", "N"), ("X", "L")))],
            ("0", "#", "Y"): [("q11", (("0", "N"), ("#", "N"), ("Y", "R")))],
            ("0", "#", "X"): [("q11", (("0", "N"), ("#", "N"), ("X", "R")))],
            ("0", "#", "#"): [("q12", (("0", "N"), ("#", "N"), ("Y", "L")))],
        },
        "q12": {
            ("0", "#", "X"): [("q20", (("0", "N"), ("#", "N"), ("X", "L")))],
            ("0", "#", "Y"): [("q21", (("0", "N"), ("#", "N"), ("Y", "L")))],
        },
        "q13": {
            ("0", "#", "X"): [("q13", (("0", "N"), ("#", "N"), ("X", "L")))],
            ("0", "#", "#"): [("q14", (("0", "N"), ("#", "N"), ("X", "L")))],
        },
        "q14": {
            ("0", "#", "Y"): [("q14", (("0", "N"), ("#", "N"), ("Y", "L")))],
            ("0", "#", "X"): [("q15", (("0", "N"), ("#", "N"), ("X", "R")))],
            ("0", "#", "S"): [("q15", (("0", "N"), ("#", "N"), ("S", "R")))],
        },
        "q15": {("0", "#", "Y"): [("q17", (("0", "N"), ("#", "N"), ("S", "R")))]},
        "q17": {
            ("0", "#", "Y"): [("q17", (("0", "N"), ("#", "N"), ("Y", "R")))],
            ("0", "#", "X"): [("q17", (("0", "N"), ("#", "N"), ("X", "R")))],
            ("0", "#", "#"): [("q18", (("0", "N"), ("#", "N"), ("X", "L")))],
        },
        "q18": {
            ("0", "#", "X"): [("q18", (("0", "N"), ("#", "N"), ("X", "L")))],
            ("0", "#", "Y"): [("q14", (("0", "N"), ("#", "N"), ("Y", "L")))],
            ("0", "#", "S"): [("q19", (("0", "N"), ("#", "N"), ("Y", "L")))],
        },
        "q19": {
            ("0", "#", "S"): [("q19", (("0", "N"), ("#", "N"), ("Y", "L")))],
            ("0", "#", "X"): [("q19", (("0", "N"), ("#", "N"), ("X", "R")))],
            ("0", "#", "Y"): [("q19", (("0", "N"), ("#", "N"), ("Y", "R")))],
            ("0", "#", "#"): [("q12", (("0", "N"), ("#", "N"), ("X", "L")))],
        },
        "q20": {
            ("0", "#", "X"): [("q20", (("0", "N"), ("#", "N"), ("X", "L")))],
            ("0", "#", "Y"): [("q22", (("0", "N"), ("#", "N"), ("Y", "R")))],
        },
        "q21": {
            ("0", "#", "Y"): [("q21", (("0", "N"), ("#", "N"), ("Y", "L")))],
            ("0", "#", "X"): [("q22", (("0", "N"), ("#", "N"), ("X", "R")))],
        },
        "q22": {
            ("0", "#", "X"): [("q22", (("0", "N"), ("0", "R"), ("X", "R")))],
            ("0", "#", "Y"): [("q22", (("0", "N"), ("0", "R"), ("Y", "R")))],
            ("0", "#", "#"): [("q23", (("0", "N"), ("#", "N"), ("#", "N")))],
        },
        "q23": {
            ("0", "#", "#"): [("q23", (("0", "L"), ("#", "N"), ("#", "N")))],
            ("#", "#", "#"): [("q26", (("#", "R"), ("#", "L"), ("#", "N")))],
        },
        "q26": {
            ("0", "0", "#"): [("q26", (("0", "N"), ("0", "L"), ("#", "N")))],
            ("0", "#", "#"): [("qc", (("0", "N"), ("#", "R"), ("#", "N")))],
        },
        "q24": {
            ("0", "#", "Y"): [("q24", (("0", "N"), ("#", "N"), ("Y", "R")))],
            ("0", "#", "X"): [("q24", (("0", "N"), ("#", "N"), ("X", "R")))],
            ("0", "#", "#"): [("q25", (("0", "N"), ("#", "N"), ("Y", "R")))],
        },
        "q25": {("0", "#", "#"): [("q12", (("0", "N"), ("#", "N"), ("Y", "L")))]},
    },
    initial_state="q-1",
    blank_symbol="#",
    final_states={"qf"},
)


def approximate_matcher():
    """Is y within k edits of x? The input is k in unary, x and y, separated by |, such as 11|ACGTACGT|CGTACGTA. The
    machine copies k onto tape 3 and x onto tape 2, aligns x with y, and leaves the edits on tape 4."""
    transitions = {
        "q0": {(c, "#", "#", "#"): [("qk", ((c, "N"), ("$", "R"), ("$", "R"), ("#", "N")))] for c in "1|"},
        "qk": {  # copy the budget onto tape 3
            ("1", "#", "#", "#"): [("qk", (("1", "R"), ("#", "N"), ("1", "R"), ("#", "N")))],
            ("|", "#", "#", "#"): [("qx", (("|", "R"), ("#", "N"), ("#", "L"), ("#", "N")))],
        },
        "qx": {},  # copy x onto tape 2
        "qr": {},  # move head 2 back to the start of x
        "qa": {},  # align
    }
    for budget in "1$":
        for a in "ACGT":
            transitions["qx"][(a, "#", budget, "#")] = [("qx", ((a, "R"), (a, "R"), (budget, "N"), ("#", "N")))]
        transitions["qx"][("|", "#", budget, "#")] = [("qr", (("|", "R"), ("#", "L"), (budget, "N"), ("#", "N")))]
        for b in "ACGT#":
            for a in "ACGT":
                transitions["qr"][(b, a, budget, "#")] = [("qr", ((b, "N"), (a, "L"), (budget, "N"), ("#", "N")))]
            transitions["qr"][(b, "$", budget, "#")] = [("qa", ((b, "N"), ("$", "R"), (budget, "N"), ("#", "N")))]

    for budget in "1$":  # head 3 reads an unused edit, or the $ once none is left
        for b in "ACGT#":  # head 1 reads y
            for a in "ACGT#":  # head 2 reads x
                moves = []
                if a == b == "#":  # both strings are used up: accept
                    moves.append(("qf", ((b, "N"), (a, "N"), (budget, "N"), ("#", "N"))))
                if a == b != "#":  # match
                    moves.append(("qa", ((b, "R"), (a, "R"), (budget, "N"), ("M", "R"))))
                if budget == "1":  # each edit erases one mark from tape 3
                    if a != b and "#" not in (a, b):  # substitute
                        moves.append(("qa", ((b, "R"), (a, "R"), ("#", "L"), ("S", "R"))))
                    if a != "#":  # delete a symbol of x
                        moves.append(("qa", ((b, "N"), (a, "R"), ("#", "L"), ("D", "R"))))
                    if b != "#":  # insert a symbol of y
                        moves.append(("qa", ((b, "R"), (a, "N"), ("#", "L"), ("I", "R"))))
                if moves:
                    transitions["qa"][(b, a, budget, "#")] = moves

    return MNTM(
        states={"q0", "qk", "qx", "qr", "qa", "qf"},
        input_symbols=set("ACGT1|"),
        tape_symbols=set("ACGT1|$#MSDI"),
        n_tapes=4,
        transitions=transitions,
        initial_state="q0",
        blank_symbol="#",
        final_states={"qf"},
    )


matcher = approximate_matcher()

# The matcher's diagram names bases instead of listing them: a and b stand for any of A, C, G and T, the same letter on
# one line is the same base, and "(a ≠ b)" keeps a line to different bases. The script checks that these labels stand
# for exactly the machine's transitions.
MATCHER_LABELS = {
    ("q0", "qk"): ["1,| → N ; # → $|R ; # → $|R ; # → N"],
    ("qk", "qk"): ["1 → R ; # → N ; # → 1|R ; # → N"],
    ("qk", "qx"): ["| → R ; # → N ; # → L ; # → N"],
    ("qx", "qx"): ["a → R ; # → a|R ; 1,$ → N ; # → N"],
    ("qx", "qr"): ["| → R ; # → L ; 1,$ → N ; # → N"],
    ("qr", "qr"): ["b,# → N ; a → L ; 1,$ → N ; # → N"],
    ("qr", "qa"): ["b,# → N ; $ → R ; 1,$ → N ; # → N"],
    ("qa", "qa"): [
        "a → R ; a → R ; 1,$ → N ; # → M|R",
        "b → R ; a → R ; 1 → #|L ; # → S|R (a ≠ b)",
        "b,# → N ; a → R ; 1 → #|L ; # → D|R",
        "b → R ; a,# → N ; 1 → #|L ; # → I|R",
    ],
    ("qa", "qf"): ["# → N ; # → N ; 1,$ → N ; # → N"],
}


def expand(line):
    """The transitions a diagram label stands for, as (reads, (write, move) per tape)."""
    line, _, condition = line.partition(" (")
    tapes = [part.split(" → ") for part in line.split(" ; ")]
    names = sorted({symbol for read, _ in tapes for symbol in read.split(",") if symbol in "ab"})
    transitions = set()
    for bases in product("ACGT", repeat=len(names)):
        base = dict(zip(names, bases))
        if condition and base["a"] == base["b"]:
            continue
        choices = []
        for read, action in tapes:
            write, _, move = action.rpartition("|")
            choices.append([(base.get(r, r), base.get(write, write) if write else base.get(r, r), move) for r in read.split(",")])
        for row in product(*choices):
            transitions.add((tuple(r for r, _, _ in row), tuple((w, m) for _, w, m in row)))
    return transitions


def steps(machine, word):
    """Number of transitions a deterministic machine takes on the word."""
    return sum(1 for _ in machine.read_input_stepwise(word)) - 1


def visited(machine, word):
    """Number of configurations the breadth-first search visits, and whether it accepts."""
    count = 0
    try:
        for _ in machine.read_input_stepwise(word):
            count += 1
    except RejectionException:
        return count, False
    return count, True


def palindrome(n):
    half = ("01" * n)[: n // 2]
    return half + "1" * (n % 2) + half[::-1]


def edit_distance(x, y):
    """Wagner and Fischer's dynamic program, one row at a time."""
    row = list(range(len(y) + 1))
    for i, a in enumerate(x, 1):
        diagonal, row[0] = row[0], i
        for j, b in enumerate(y, 1):
            diagonal, row[j] = row[j], min(row[j] + 1, row[j - 1] + 1, diagonal + (a != b))
    return row[-1]


def transitions(machine):
    """Number of moves in the transition table, counting every alternative of a nondeterministic one."""
    count = len if isinstance(machine, MNTM) else lambda move: 1
    return sum(count(moves) for by_read in machine.transitions.values() for moves in by_read.values())


def tapes(config):
    return [("".join(tape.tape), tape.current_position) for tape in config.tapes]


def decode(extended):
    """The (tape, head) pairs encoded on read_input_as_ntm's single tape: each tape ends with _, ^ follows the head's cell."""
    return [(segment.replace("^", ""), segment.index("^") - 1) for segment in extended.split("_")[:-1]]


def last(run):
    *_, (config,) = run
    return config


def comparisons(word):
    """What tapes 2 and 3 hold each time the perfect-squares machine compares tape 2 with the input, and the outcome."""
    trace = []
    try:
        for (config,) in perfect_squares.read_input_stepwise(word):
            trace.append(config)
    except RejectionException:  # a rejected run raises once it stops
        pass
    return [
        ("".join(before.tapes[1].tape).strip("#"), "".join(before.tapes[2].tape).strip("#"), after.state)
        for before, after in zip(trace, trace[1:])
        if before.state == "qc" and after.state in ("q3", "qf", "qr")
    ]


# The SVG figures draw with the page's CSS classes, so they follow its light and dark themes. Their mathjax_ignore class
# keeps MathJax from reading the $ on their tapes as math.
CELL = 36


def cells(symbols, x, y, head=None):
    out = []
    for i, symbol in enumerate(symbols):
        cx = x + i * CELL
        cls = "tm-sym tm-muted" if symbol in "#_" else "tm-sym tm-marker" if symbol == "^" else "tm-sym"
        out.append(f'<rect class="tm-cell" x="{cx}" y="{y}" width="{CELL}" height="{CELL}"/>')
        out.append(f'<text class="{cls}" x="{cx + CELL / 2}" y="{y + CELL / 2}">{symbol}</text>')
    end = x + len(symbols) * CELL
    out.append(f'<text class="tm-muted" x="{end + 14}" y="{y + CELL / 2}">…</text>')
    if head is not None:
        hx = x + head * CELL + CELL / 2
        out.append(f'<path class="tm-head" d="M{hx} {y + CELL + 4}l7 11h-14z"/>')
    return out


def svg(width, height, title, desc, body):
    return "\n".join(
        [
            f'<svg class="tm-fig mathjax_ignore" viewBox="0 0 {width} {height}" role="img" aria-labelledby="{title[0]} {desc[0]}">',
            f'<title id="{title[0]}">{title[1]}</title>',
            f'<desc id="{desc[0]}">{desc[1]}</desc>',
            *body,
            "</svg>",
            "",
        ]
    )


def two_tapes_figure(config):
    (tape1, head1), (tape2, head2) = tapes(config)
    width = 9
    body = [
        f'<rect class="tm-control" x="4" y="38" width="84" height="122" rx="6"/>',
        '<text class="tm-muted" x="46" y="86">state</text>',
        f'<text class="tm-sym tm-state" x="46" y="112">{config.state}</text>',
        '<text class="tm-muted tm-start" x="112" y="22">Tape 1</text>',
        *cells(tape1.ljust(width, "#"), 112, 32, head1),
        '<text class="tm-muted tm-start" x="112" y="112">Tape 2</text>',
        *cells(tape2.ljust(width, "#"), 112, 122, head2),
    ]
    tape_text = " and ".join(f"{t.rstrip('#') or 'blank'} with its head on cell {h + 1}" for t, h in tapes(config))
    return svg(480, 178, ("tm-config-title", "A two-tape machine"), ("tm-config-desc", f"State {config.state}; the tapes hold {tape_text}."), body)


def one_tape_figure(state, extended):
    split = extended.index("_") + 1
    x = 24
    body = [
        f'<text class="tm-muted tm-start" x="{x}" y="22">state {state}</text>',
        *cells(extended, x, 32),
        f'<path class="tm-axis" d="M{x + 4} 80v6H{x + split * CELL - 4}v-6"/>',
        f'<text class="tm-muted" x="{x + split * CELL / 2}" y="102">Tape 1</text>',
        f'<path class="tm-axis" d="M{x + split * CELL + 4} 80v6H{x + len(extended) * CELL - 4}v-6"/>',
        f'<text class="tm-muted" x="{x + (split + len(extended)) * CELL / 2}" y="102">Tape 2</text>',
    ]
    desc = f"The single tape reads {extended}: each tape is followed by _, and ^ follows the cell under each head."
    return svg(480, 112, ("tm-encoding-title", "The same two tapes on one tape"), ("tm-encoding-desc", desc), body)


def steps_figure(one, two):
    left, right, top, bottom = 56, 404, 54, 272
    n_max, y_max = len(one) - 1, 6000
    px = lambda n: left + (right - left) * n / n_max
    py = lambda s: bottom - (bottom - top) * s / y_max
    body = [f'<text class="tm-muted tm-start" x="8" y="{top - 22}">Steps</text>']
    for s in range(0, y_max + 1, 1000):
        body.append(f'<path class="{"tm-axis" if s == 0 else "tm-grid"}" d="M{left} {py(s):.1f}H{right}"/>')
        body.append(f'<text class="tm-muted tm-end tm-num" x="{left - 8}" y="{py(s):.1f}">{s:,}</text>')
    for n in range(0, n_max + 1, 20):
        body.append(f'<text class="tm-muted tm-num" x="{px(n):.1f}" y="{bottom + 18}">{n}</text>')
    body.append(f'<text class="tm-muted" x="{(left + right) / 2}" y="{bottom + 42}">Input length <tspan font-style="italic">n</tspan></text>')
    keys = [("tm-one", "One tape (DTM)", 128), ("tm-two", "Two tapes (MNTM)", 268)]
    for cls, label, kx in keys:
        body.append(f'<path class="tm-line {cls}" d="M{kx} 12h16"/>')
        body.append(f'<text class="tm-start" x="{kx + 22}" y="12">{label}</text>')
    for cls, series in (("tm-one", one), ("tm-two", two)):
        points = " ".join(f"{px(n):.1f},{py(s):.1f}" for n, s in enumerate(series))
        body.append(f'<polyline class="tm-line {cls}" points="{points}"/>')
        end_x, end_y = px(n_max), py(series[-1])
        body.append(f'<circle class="tm-dot {cls}" cx="{end_x:.1f}" cy="{end_y:.1f}" r="4"/>')
        body.append(f'<text class="tm-start tm-num" x="{end_x + 10:.1f}" y="{end_y:.1f}">{series[-1]:,}</text>')
    desc = f"At length {n_max}, one tape takes {one[-1]:,} steps and two tapes take {two[-1]:,}; the one-tape count grows quadratically, the two-tape count linearly."
    return svg(480, 326, ("tm-steps-title", "Steps to accept a palindrome of length n"), ("tm-steps-desc", desc), body)


# State diagrams, drawn by Graphviz in the course's notation and colored by the page's CSS.
def moves_by_edge(machine):
    """The machine's transitions grouped by edge, each as one (read, write, move) triple per tape."""
    edges = {}
    for state, by_read in machine.transitions.items():
        for read, moves in by_read.items():
            if isinstance(machine, DTM):
                target, write, move = moves
                edges.setdefault((state, target), []).append([(read, write, move)])
            else:
                for target, writes in moves:
                    edges.setdefault((state, target), []).append([(r, w, d) for r, (w, d) in zip(read, writes)])
    return edges


def label_lines(rows):
    """One line per transition: read → write|move for each tape, ; between tapes, and the write left out when the symbol
    stays. Transitions that differ only in what an untouched tape reads share a line, as in 0,1 → R."""
    rows = [list(row) for row in rows]
    merged = True
    while merged:
        merged = False
        for i, j in combinations(range(len(rows)), 2):
            diff = [k for k in range(len(rows[i])) if rows[i][k] != rows[j][k]]
            if len(diff) == 1:
                (r1, w1, m1), (r2, w2, m2) = rows[i][diff[0]], rows[j][diff[0]]
                if r1 == w1 and r2 == w2 and m1 == m2:
                    reads = ",".join(sorted(set(r1.split(",") + r2.split(","))))
                    rows[i][diff[0]] = (reads, reads, m1)
                    del rows[j]
                    merged = True
                    break
    return [" ; ".join(f"{r} → {m}" if r == w else f"{r} → {w}|{m}" for r, w, m in row) for row in rows]


def still_tapes(machine):
    """States in which every tape but the last keeps its symbol and its head."""
    edges = moves_by_edge(machine)
    states = {}
    for (state, _), rows in edges.items():
        states[state] = states.get(state, True) and all(r == w and m == "N" for row in rows for r, w, m in row[:-1])
    return {state for state, still in states.items() if still}


def graphviz():
    dot = os.environ.get("GRAPHVIZ_DOT") or shutil.which("dot")
    if not dot:
        raise SystemExit("Graphviz's dot is needed for the state diagrams: put it on PATH or set GRAPHVIZ_DOT.")
    return dot


def state_diagram(machine, ident, title, desc, rankdir="LR", clusters=(), last_tape_only=(), layout="", labels=None):
    """The machine's state diagram as SVG for the page. In the states of last_tape_only, the labels show the last tape alone;
    labels, if given, replaces the labels of every edge, and layout adds Graphviz graph attributes."""
    edges = moves_by_edge(machine)
    dot = [
        "digraph {",
        f'rankdir={rankdir}; nodesep=0.3; ranksep=0.4; bgcolor="transparent"; {layout}',
        'node [shape=circle, fixedsize=true, width=0.55, fontname="Courier", fontsize=14];',
        'edge [fontname="Courier", fontsize=12, arrowsize=0.7];',
        'start [shape=none, label="", width=0.05, height=0.05];',
    ]
    for label, members, *attributes in clusters:
        members = " ".join(f'"{s}";' for s in sorted(members))
        dot.append(f'subgraph "cluster {label}" {{ label="{label}"; style=rounded; margin=14; fontname="Helvetica"; fontsize=13; {" ".join(attributes)} {members} }}')
    for state in sorted({machine.initial_state, *(s for edge in edges for s in edge)}):
        dot.append(f'"{state}" [shape={"doublecircle" if state in machine.final_states else "circle"}];')
    dot.append(f'start -> "{machine.initial_state}" [label="start"];')
    for (state, target), rows in edges.items():
        if state in last_tape_only:
            rows = [row[-1:] for row in rows]
        label = r"\n".join(labels[(state, target)] if labels else label_lines(rows))
        dot.append(f'"{state}" -> "{target}" [label="{label}"];')
    dot.append("}")
    out = subprocess.run([graphviz(), "-Tsvg"], input="\n".join(dot).encode("utf-8"), capture_output=True, check=True).stdout.decode("utf-8")

    # Drop what the page doesn't need: the fixed size, the ids (they would repeat across diagrams), Graphviz's tooltips
    # and the background. The page's CSS colors the rest.
    out = re.sub(r"<\?xml.*?\?>|<!DOCTYPE.*?>|<!--.*?-->|<title>.*?</title>", "", out, flags=re.S)
    out = re.sub(r' id="[^"]*"', "", out)
    out = re.sub(r'<polygon fill="transparent" stroke="transparent"[^>]*/>', "", out, count=1)
    # Never wider than drawn, and on narrow screens no narrower than 60% of it, so the labels stay legible and the
    # diagram scrolls in its container instead.
    width = float(re.search(r'<svg width="([\d.]+)pt"', out)[1]) * 4 / 3
    out = re.sub(
        r"<svg [^>]*(viewBox=\"[^\"]*\")[^>]*>",
        lambda m: f'<svg class="tm-graph mathjax_ignore" {m[1]} role="img" aria-labelledby="{ident}-title {ident}-desc" style="min-width: {0.6 * width:.0f}px; max-width: {width:.0f}px">'
        f'\n<title id="{ident}-title">{title}</title>\n<desc id="{ident}-desc">{desc}</desc>',
        out,
        count=1,
    )
    return "\n".join(line for line in out.splitlines() if line.strip()) + "\n"


if __name__ == "__main__":
    # Every palindrome machine accepts exactly the palindromes over {0, 1}, checked on all words up to length 8.
    for n in range(9):
        for word in map("".join, product("01", repeat=n)):
            for machine in (palindromes, one_tape, two_tapes):
                assert machine.accepts_input(word) == (word == word[::-1]), (machine, word)

    # The perfect-squares machine accepts # followed by n^2 zeros, n >= 1, and nothing else up to 50 zeros.
    for n in range(51):
        assert perfect_squares.accepts_input("#" + "0" * n) == (n > 0 and round(n**0.5) ** 2 == n), n

    # The matcher accepts exactly when the edit distance is at most k, checked on all pairs over {A, C} up to length 3.
    for x, y in product(("".join(w) for n in range(4) for w in product("AC", repeat=n)), repeat=2):
        for k in range(3):
            assert matcher.accepts_input("1" * k + "|" + x + "|" + y) == (edit_distance(x, y) <= k), (x, y, k)

    # The matcher's diagram labels stand for exactly its transitions, edge by edge.
    edges = moves_by_edge(matcher)
    assert set(edges) == set(MATCHER_LABELS)
    for edge, rows in edges.items():
        concrete = {(tuple(r for r, _, _ in row), tuple((w, m) for _, w, m in row)) for row in rows}
        assert set().union(*map(expand, MATCHER_LABELS[edge])) == concrete, edge

    # The single-tape simulation ends on the same tapes as the multitape run.
    runs = [(palindromes, palindrome(n)) for n in range(7)] + [(two_tapes, palindrome(n)) for n in range(7)]
    runs += [(perfect_squares, "#" + "0" * n) for n in (1, 4, 9)] + [(matcher, "11|ACGTACGT|CGTACGTA")]
    for machine, word in runs:
        assert decode("".join(last(machine.read_input_as_ntm(word)).tape.tape)) == tapes(last(machine.read_input_stepwise(word))), word

    # Exact step counts, quoted on the page.
    one = [steps(one_tape, palindrome(n)) for n in range(101)]
    two = [steps(two_tapes, palindrome(n)) for n in range(101)]
    assert all(s == (n + 1) * (n + 2) // 2 for n, s in enumerate(one))
    assert all(s == (4 * n + 3 if n else 1) for n, s in enumerate(two))
    assert min(n for n in range(101) if two[n] < one[n]) == 6

    print("Table 1 | One tape (DTM) | Two tapes (MNTM)")
    print(f"States | {len(one_tape.states)} | {len(two_tapes.states)}")
    print(f"Transitions | {transitions(one_tape)} | {transitions(two_tapes)}")
    for n in (10, 20, 50, 100):
        print(f"Steps, n = {n} | {one[n]:,} | {two[n]:,}")

    print("\npalindromes:", len(palindromes.states), "states,", transitions(palindromes), "transitions")
    print("accepts 0110:", palindromes.accepts_input("0110"), "| accepts 0111:", palindromes.accepts_input("0111"))
    print("configurations visited on 0110:", sum(1 for _ in palindromes.read_input_stepwise("0110")))
    (config,) = palindromes.read_input("0110")
    config.print()

    run = [config for (config,) in palindromes.read_input_as_ntm("0110")]
    print("single-tape configurations on 0110:", len(run))
    for config in (run[0], run[-1]):
        print(config.state, "".join(config.tape.tape))

    # Table 2: the comparisons the perfect-squares machine makes on 0^9, and its verdict on 0^10.
    reachable = {s for edge in moves_by_edge(perfect_squares) for s in edge}
    print(f"\nperfect squares: {len(perfect_squares.states)} states, {len(reachable)} used, {transitions(perfect_squares)} transitions")
    print("Table 2 | Tape 2 | Tape 3 | Outcome")
    nine = comparisons("#" + "0" * 9)
    assert [(len(zeros), outcome) for zeros, _, outcome in nine] == [(1, "q3"), (4, "q3"), (9, "qf")]
    assert [(len(zeros), outcome) for zeros, _, outcome in comparisons("#" + "0" * 10)] == [(1, "q3"), (4, "q3"), (9, "q3"), (16, "qr")]
    for zeros, blocks, outcome in nine:
        print(f"{zeros} | {blocks} | {outcome}")

    # Table 3: the matcher on a shifted read, for growing budgets.
    x, y = "ACGTACGT", "CGTACGTA"
    print(f"\nmatcher: {len(matcher.states)} states, {transitions(matcher)} transitions; edit distance {edit_distance(x, y)}, DP cells {(len(x) + 1) * (len(y) + 1)}")
    for k in range(1, 6):
        count, accepted = visited(matcher, "1" * k + "|" + x + "|" + y)
        print(f"k = {k} | {'accepted' if accepted else 'rejected'} | {count:,}")
    (config,) = matcher.read_input("11|" + x + "|" + y)
    config.print()

    # Figures 1 and 3: the usage example on 0110, after it has pushed 01 and before it guesses the middle.
    multitape = next(c for (c,) in palindromes.read_input_stepwise("0110") if c.state == "q1" and tapes(c) == [("0110", 2), ("$01#", 3)])
    single = next("".join(c.tape.tape) for (c,) in palindromes.read_input_as_ntm("0110") if c.state == "q1" and decode("".join(c.tape.tape)) == tapes(multitape))
    FIGURES.mkdir(parents=True, exist_ok=True)
    (FIGURES / "two-tapes.svg").write_text(two_tapes_figure(multitape), encoding="utf-8")
    (FIGURES / "one-tape.svg").write_text(one_tape_figure(multitape.state, single), encoding="utf-8")
    (FIGURES / "steps.svg").write_text(steps_figure(one, two), encoding="utf-8")

    # The state diagrams.
    diagrams = {
        "palindromes-diagram.svg": state_diagram(
            palindromes, "tm-palindromes", "The palindrome machine", "Four states: q0 writes $ on tape 2, q1 pushes or guesses the middle, q2 compares, q3 accepts."
        ),
        "one-tape-diagram.svg": state_diagram(
            one_tape, "tm-one-tape", "The single-tape palindrome machine", "Seven states that cross off matching symbols at both ends of the input until none are left."
        ),
        "two-tapes-diagram.svg": state_diagram(
            two_tapes,
            "tm-two-tapes",
            "The two-tape palindrome machine",
            "Six states that copy the input, rewind the copy and compare it with the input read backwards.",
            rankdir="TB",
        ),
        "perfect-squares-diagram.svg": state_diagram(
            perfect_squares,
            "tm-squares",
            "The perfect-squares machine",
            f"The {len(reachable)} states it uses, in four phases: set up, compare tape 2 with the input, write the next block on tape 3, and copy it onto tape 2.",
            rankdir="TB",
            clusters=[
                ("set up", {"q-1", "q0", "q1", "q2"}),
                ("compare", {"qc"}),
                ("write the next block on tape 3", still_tapes(perfect_squares), "labeljust=l;"),  # clear of the edge into q3
                ("copy it onto tape 2", {"q22", "q23", "q26"}),
            ],
            last_tape_only=still_tapes(perfect_squares),
            layout="nodesep=0.22; ranksep=0.3; newrank=true;",
        ),
        "matcher-diagram.svg": state_diagram(
            matcher,
            "tm-matcher",
            "The approximate matcher",
            "Six states: q0, qk, qx and qr copy the budget and x onto tapes 3 and 2, qa matches, substitutes, deletes or inserts, and qf accepts.",
            rankdir="TB",
            labels=MATCHER_LABELS,
        ),
    }
    for name, content in diagrams.items():
        (FIGURES / name).write_text(content, encoding="utf-8")
    print("\nwrote", *sorted(p.name for p in FIGURES.iterdir()), "to", FIGURES)
