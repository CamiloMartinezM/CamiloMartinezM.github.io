"""Machines, numbers and figures for the Multitape Nondeterministic Turing Machines Project page.

Needs automata-lib 9.2.0 (pip install automata-lib==9.2.0). Run it from the repository root:

    python scripts/multitape_palindromes.py

It checks that every machine accepts exactly the palindromes, prints the numbers the page quotes and writes the
page's three figures to _includes/multitape-turing-machines/.
"""

from itertools import product
from pathlib import Path

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


def steps(machine, word):
    """Number of transitions a deterministic machine takes on the word."""
    return sum(1 for _ in machine.read_input_stepwise(word)) - 1


def palindrome(n):
    half = ("01" * n)[: n // 2]
    return half + "1" * (n % 2) + half[::-1]


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


# The SVG figures draw with the page's CSS classes, so they follow its light and dark themes.
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
            f'<svg class="tm-fig" viewBox="0 0 {width} {height}" role="img" aria-labelledby="{title[0]} {desc[0]}">',
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
    return svg(480, 178, ("tm-fig1-title", "A two-tape machine"), ("tm-fig1-desc", f"State {config.state}; the tapes hold {tape_text}."), body)


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
    return svg(480, 112, ("tm-fig2-title", "The same two tapes on one tape"), ("tm-fig2-desc", desc), body)


def steps_figure(one, two):
    left, right, top, bottom = 56, 404, 44, 262
    n_max, y_max = len(one) - 1, 6000
    px = lambda n: left + (right - left) * n / n_max
    py = lambda s: bottom - (bottom - top) * s / y_max
    body = [f'<text class="tm-muted tm-start" x="8" y="{top - 16}">Steps</text>']
    for s in range(0, y_max + 1, 1000):
        body.append(f'<path class="{"tm-axis" if s == 0 else "tm-grid"}" d="M{left} {py(s):.1f}H{right}"/>')
        body.append(f'<text class="tm-muted tm-end tm-num" x="{left - 8}" y="{py(s):.1f}">{s:,}</text>')
    for n in range(0, n_max + 1, 20):
        body.append(f'<text class="tm-muted tm-num" x="{px(n):.1f}" y="{bottom + 18}">{n}</text>')
    body.append(f'<text class="tm-muted" x="{(left + right) / 2}" y="{bottom + 42}">Input length n</text>')
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
    return svg(480, 316, ("tm-fig3-title", "Steps to accept a palindrome of length n"), ("tm-fig3-desc", desc), body)


if __name__ == "__main__":
    # Every machine accepts exactly the palindromes over {0, 1}, checked on all words up to length 8.
    for n in range(9):
        for word in map("".join, product("01", repeat=n)):
            for machine in (palindromes, one_tape, two_tapes):
                assert machine.accepts_input(word) == (word == word[::-1]), (machine, word)

    # The single-tape simulation ends on the same tapes as the multitape run.
    for n in range(7):
        word = palindrome(n)
        for machine in (palindromes, two_tapes):
            assert decode("".join(last(machine.read_input_as_ntm(word)).tape.tape)) == tapes(last(machine.read_input_stepwise(word)))

    # Exact step counts, quoted on the page.
    one = [steps(one_tape, palindrome(n)) for n in range(101)]
    two = [steps(two_tapes, palindrome(n)) for n in range(101)]
    assert all(s == (n + 1) * (n + 2) // 2 for n, s in enumerate(one))
    assert all(s == (4 * n + 3 if n else 1) for n, s in enumerate(two))
    assert min(n for n in range(101) if two[n] < one[n]) == 6

    print("Machine | states | transitions | " + " | ".join(f"n = {n}" for n in (10, 20, 50, 100)))
    for name, machine, series in (("One tape (DTM)", one_tape, one), ("Two tapes (MNTM)", two_tapes, two)):
        print(f"{name} | {len(machine.states)} | {transitions(machine)} | " + " | ".join(f"{series[n]:,}" for n in (10, 20, 50, 100)))

    print("\npalindromes:", len(palindromes.states), "states,", transitions(palindromes), "transitions")
    print("accepts 0110:", palindromes.accepts_input("0110"), "| accepts 0111:", palindromes.accepts_input("0111"))
    print("configurations visited on 0110:", sum(1 for _ in palindromes.read_input_stepwise("0110")))
    (config,) = palindromes.read_input("0110")
    config.print()

    run = [config for (config,) in palindromes.read_input_as_ntm("0110")]
    print("single-tape configurations on 0110:", len(run))
    for config in (run[0], run[-1]):
        print(config.state, "".join(config.tape.tape))

    # Figures 1 and 2: the usage example on 0110, after it has pushed 01 and before it guesses the middle.
    multitape = next(c for (c,) in palindromes.read_input_stepwise("0110") if c.state == "q1" and tapes(c) == [("0110", 2), ("$01#", 3)])
    single = next("".join(c.tape.tape) for (c,) in palindromes.read_input_as_ntm("0110") if c.state == "q1" and decode("".join(c.tape.tape)) == tapes(multitape))
    FIGURES.mkdir(parents=True, exist_ok=True)
    (FIGURES / "two-tapes.svg").write_text(two_tapes_figure(multitape), encoding="utf-8")
    (FIGURES / "one-tape.svg").write_text(one_tape_figure(multitape.state, single), encoding="utf-8")
    (FIGURES / "steps.svg").write_text(steps_figure(one, two), encoding="utf-8")
    print("\nwrote", *sorted(p.name for p in FIGURES.iterdir()), "to", FIGURES)
