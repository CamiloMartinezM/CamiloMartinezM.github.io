---
layout: page
title: Multitape Nondeterministic Turing Machines
description: A multitape, nondeterministic Turing machine class contributed to automata, an open-source Python library for automata theory.
img: assets/img/projects/multitape-turing-machines/icon.png
importance: 4
_styles: >
  .post-header .post-description { display: none; }
  .text-highlighted { color: var(--global-theme-color); }
  .table-responsive table { width: 100%; color: inherit; border-collapse: collapse; border-top: 3px solid var(--global-text-color); border-bottom: 3px solid var(--global-text-color); }
  .table-responsive caption { caption-side: top; padding-bottom: 0.5rem; color: inherit; text-align: justify; }
  .table-responsive thead tr { border-top: 2px solid var(--global-text-color); border-bottom: 2px solid var(--global-text-color); }
  .table-responsive tbody tr:hover { background: var(--global-divider-color); }
  .table-responsive th, .table-responsive td { padding: 4px 8px; text-align: center; font-variant-numeric: tabular-nums; }
  .table-responsive th:first-child, .table-responsive td:first-child { text-align: left; white-space: nowrap; }
  .tm-fig { display: block; width: 100%; max-width: 600px; height: auto; margin: 0 auto; }
  .tm-fig text { fill: var(--global-text-color); font-size: 14px; text-anchor: middle; dominant-baseline: central; }
  .tm-fig .tm-start { text-anchor: start; }
  .tm-fig .tm-end { text-anchor: end; }
  .tm-fig .tm-muted { fill: var(--global-text-color-light); }
  .tm-fig .tm-num { font-variant-numeric: tabular-nums; }
  .tm-fig .tm-sym { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; font-size: 18px; }
  .tm-fig .tm-state { font-weight: 700; }
  .tm-fig .tm-marker, .tm-fig .tm-head { fill: var(--global-theme-color); }
  .tm-fig .tm-marker { font-weight: 700; }
  .tm-fig .tm-cell, .tm-fig .tm-control, .tm-fig .tm-axis { fill: none; stroke: var(--global-text-color-light); stroke-width: 1; }
  .tm-fig .tm-grid { stroke: var(--global-divider-color); stroke-width: 1; }
  .tm-fig .tm-one { --tm-series: #eb6834; }
  html[data-theme="dark"] .tm-fig .tm-one { --tm-series: #d95926; }
  .tm-fig .tm-two { --tm-series: var(--global-theme-color); }
  .tm-fig .tm-line { fill: none; stroke: var(--tm-series); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .tm-fig .tm-dot { fill: var(--tm-series); stroke: var(--global-bg-color); stroke-width: 2; }
  .tm-scroll { overflow-x: auto; }
  .tm-scroll + .tm-scroll { margin-top: 1rem; }
  .tm-graph { display: block; width: 100%; height: auto; margin: 0 auto; }
  .tm-graph text { fill: var(--global-text-color); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; }
  .tm-graph .cluster text { fill: var(--global-text-color-light); font-family: inherit; }
  .tm-graph .cluster path, .tm-graph .cluster polygon { fill: none; stroke: var(--global-text-color-light); }
  .tm-graph .node ellipse { fill: none; stroke: var(--global-text-color); stroke-width: 1.5; }
  .tm-graph .edge path { fill: none; stroke: var(--global-theme-color); stroke-width: 1.2; }
  .tm-graph .edge polygon { fill: var(--global-theme-color); stroke: var(--global-theme-color); }
---

A multitape, nondeterministic Turing machine class contributed to **[automata](https://github.com/caleb531/automata)**, an open-source Python library for automata theory. The `MNTM` class defines and runs Turing machines with any number of tapes, explores every branch of a **nondeterministic** computation breadth-first, and can replay a run on a **single tape**, following the textbook proof that both models are equally powerful.

By: [<u>Camilo Martínez</u>](https://www.linkedin.com/in/camilo-martinez-m/)

<p><a href="https://github.com/caleb531/automata"><i class="fa-brands fa-github"></i> View on GitHub</a></p>

<span class="text-highlighted">MNTM</span> is a class for [automata](https://github.com/caleb531/automata), a Python library for finite automata, pushdown automata and Turing machines. It was developed as the final project for the [Introduction to the Theory of Computation](https://uniandes.smartcatalogiq.com/2020/catalogo/cursos/mate/2000/mate-2181) course lectured by [Prof. John Richard Goodrick](https://matematicas.uniandes.edu.co/en/professors/john-richard-goodrick) at [Universidad de los Andes](https://www.uniandes.edu.co/en) during the second semester of 2020, and then contributed to the library together with its tests and its single-tape simulation. The class is documented in the library's [API reference](https://caleb531.github.io/automata/api/tm/class-mntm/), and the library's paper in the Journal of Open Source Software [\[Evans & Robson, 2023\]](https://doi.org/10.21105/joss.05759) acknowledges the contribution.

## Why Multiple Tapes?

A **Turing machine** is a finite set of states, an unbounded tape divided into cells and a head that reads and writes one cell at a time. At each step, the current state and the symbol under the head decide what the machine writes, whether the head moves left or right and which state comes next. Simple as it is, the model can carry out any algorithm, which makes it the reference for what computers can and cannot do. A **multitape** Turing machine has several tapes, each with its own head: it reads the symbols under all its heads at once, then writes on every tape and moves every head independently (Figure 1). The input starts on the first tape and the others start blank. A **nondeterministic** machine may have several possible moves in the same situation, and it accepts its input if any sequence of choices reaches an accepting state.

<figure>
{% include multitape-turing-machines/two-tapes.svg %}
<figcaption class="caption"><strong>Figure 1:</strong> A two-tape machine reading <code>0110</code>, in state <code>q1</code>, after copying <code>01</code> onto its second tape. Each triangle marks the cell under a head, and <code>#</code> is the blank symbol.</figcaption>
</figure>

Formally, a $$k$$-tape nondeterministic Turing machine is a tuple $$(Q, \Sigma, \Gamma, \delta, q_0, \#, F)$$ of states, input symbols, tape symbols, transitions, an initial state, a blank symbol and final states. Its transition function maps a state and the $$k$$ symbols under the heads to a set of possible moves:

$$
\delta : Q \times \Gamma^k \to \mathcal{P}\left(Q \times (\Gamma \times \{L, R, N\})^k\right)
$$

Each move names the next state and, for every tape, the symbol to write and where its head goes: left, right or nowhere ($$N$$, which textbooks often write as $$S$$, for stay). A deterministic machine has at most one move for each state and symbols, and with $$k = 1$$ the definition is the ordinary Turing machine.

Neither extension makes the machine more powerful: every multitape machine has an equivalent single-tape machine, and every nondeterministic machine has an equivalent deterministic one [\[Sipser, 2012\]](https://math.mit.edu/~sipser/book.html). What changes is the running time. For a machine that takes $$t(n) \geq n$$ steps on inputs of length $$n$$:

- a single-tape machine can simulate a multitape one in $$O\left(t(n)^2\right)$$ steps;
- a deterministic machine can simulate a nondeterministic one in $$2^{O(t(n))}$$ steps.

The quadratic bound cannot be improved in general: a two-tape machine recognizes palindromes in a linear number of steps, while any single-tape machine needs on the order of $$n^2$$ steps [\[Hennie, 1965\]](https://doi.org/10.1016/S0019-9958%2865%2990399-2). Whether the exponential bound can be brought down to a polynomial one is, in essence, the P versus NP problem. Multiple tapes therefore make machines easier to design, at a cost that is at most quadratic, which is why they are the standard model in complexity theory; nondeterminism is the model behind NP.

## Using the MNTM Class

An `MNTM` is defined like the library's other automata, from its states, input and tape symbols, transitions, initial state, blank symbol and final states, plus the number of tapes. The transitions map each state and the tuple of symbols under the heads to a list of moves, and a list with more than one move makes the machine nondeterministic. The machine below accepts palindromes over $$\{0, 1\}$$: it copies the first half of its input onto its second tape, guesses where the middle is, and then reads the second half while walking back over the copy (Figure 2).

<figure>
<div class="tm-scroll">
{% include multitape-turing-machines/palindromes-diagram.svg %}
</div>
<figcaption class="caption"><strong>Figure 2:</strong> The palindrome machine. Each label gives, for tape 1 and then tape 2, the symbol read, the symbol written when it changes (after <code>|</code>) and the head's move; <code>0,1</code> stands for either symbol, and the double circle is the accepting state. From <code>q1</code>, the machine can push the symbol it reads, guess that the second half starts there, or guess that it is the middle symbol.</figcaption>
</figure>

```python
from automata.tm.mntm import MNTM

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
```

The library checks the definition when the machine is created, for example that every transition reads and writes one symbol per tape, and it runs the machine with the same methods as its other automata. `read_input_stepwise` yields the configurations in the order a breadth-first search visits them, so every branch advances in turn and an accepting branch is found whenever one exists. On `0110`, the search visits 17 configurations until the branch that guesses the middle after `01` accepts, and the final configuration prints one line per tape:

```python
palindromes.accepts_input("0110")  # True
palindromes.accepts_input("0111")  # False

(config,) = palindromes.read_input("0110")
config.print()
```

```text
q3:
> Tape 1: 0110#
              ^
> Tape 2: $01#
          ^
```

## How It Works

Tapes are immutable: every step creates new tapes instead of changing the old ones, so each branch of the search holds its own copy and any configuration can be kept, compared or printed later. A tape grows by one blank cell whenever its head moves past either end. `read_input_stepwise` keeps a queue of configurations: it takes the next one, yields it and adds one successor for each applicable move. A branch with no applicable move stops there, and it accepts if its state is final; the input is rejected once the queue runs empty. Searching breadth-first rather than depth-first keeps a branch that never halts from blocking the others.

`read_input_as_ntm` runs the same machine through the single-tape construction from the proof that both models are equivalent [\[Sipser, 2012\]](https://math.mit.edu/~sipser/book.html). It writes all the tapes one after another on a single tape, ends each with the separator `_` and marks every head with a `^` right after the cell it is on (Figure 3).

<figure>
{% include multitape-turing-machines/one-tape.svg %}
<figcaption class="caption"><strong>Figure 3:</strong> The configuration of Figure 1, as <code>read_input_as_ntm</code> writes it on a single tape. Each <code>^</code> follows the cell under a head, and each <code>_</code> ends a tape.</figcaption>
</figure>

Every step of the multitape machine then takes two passes over that tape. The first collects the symbol before each `^`, which selects the transition. The second, [shown below](https://github.com/caleb531/automata/blob/v9.2.0/automata/tm/mntm.py#L397-L431), rewrites each marked cell and moves its `^` one cell to the right, to the left or not at all. When a head moves onto its tape's separator, a blank cell is inserted before the separator, which is how a tape grows; a real single-tape machine pays for it by shifting everything to the right of that cell. These passes over the whole tape are what makes the single-tape machine quadratically slower.

```python
for move in moves:
    new_head, direction = move
    executing_changes = True

    while executing_changes:
        if new_tape[i] == head_symbol:
            # Update the tape symbol before the head
            new_tape = new_tape[: i - 1] + new_head + new_tape[i:]
            # Remove the old head
            new_tape = new_tape[:i] + "" + new_tape[i + 1 :]

            # Move the head according to direction
            if direction == "R":
                i += 1
            elif direction == "L":
                i -= 1
            # else direction == 'N', i stays the same

            # Handle edge cases with tape separator
            if i > 0 and new_tape[i - 1] == tape_separator_symbol:
                i -= 1
                new_tape = (
                    new_tape[:i]
                    + self.blank_symbol
                    + head_symbol
                    + new_tape[i:]
                )
                i += 1
            else:
                new_tape = new_tape[:i] + head_symbol + new_tape[i:]

        elif new_tape[i] == tape_separator_symbol:
            executing_changes = False

        i += 1
```

The simulation follows every branch of a nondeterministic machine, as the multitape run does, and the library's tests check that both runs end on the same tapes. On `0110`, it starts from the encoded input and ends on the tapes printed above:

```python
run = [config for (config,) in palindromes.read_input_as_ntm("0110")]
for config in (run[0], run[-1]):
    print(config.state, "".join(config.tape.tape))
```

```text
q0 0^110_#^_
q3 0110#^_$^01#_
```

## One Tape vs. Many

To measure what the second tape buys, two deterministic machines built with the library decide the same language, palindromes over $$\{0, 1\}$$ (Figure 4). The single-tape `DTM` crosses off the first symbol, runs to the end of the input, checks that the last symbol matches, crosses it off and walks back to start again. The two-tape `MNTM` copies the input onto its second tape, moves the second head back to the start and compares the input read backwards with the copy read forwards.

<figure>
<div class="tm-scroll">
{% include multitape-turing-machines/one-tape-diagram.svg %}
</div>
<div class="tm-scroll">
{% include multitape-turing-machines/two-tapes-diagram.svg %}
</div>
<figcaption class="caption"><strong>Figure 4:</strong> The single-tape machine (top) and the two-tape machine (bottom), in the notation of Figure 2.</figcaption>
</figure>

Each was run with [automata-lib 9.2.0](https://github.com/caleb531/automata/releases/tag/v9.2.0) on a palindrome of every length from 0 to 100, counting its steps from `read_input_stepwise`:

```python
def steps(machine, word):
    return sum(1 for _ in machine.read_input_stepwise(word)) - 1
```

<div class="table-responsive">
<table>
<caption><strong>Table 1:</strong> Size of each machine and number of steps it takes to accept a palindrome of length <em>n</em>.</caption>
<thead>
<tr><td></td><th><strong>One tape (DTM)</strong></th><th><strong>Two tapes (MNTM)</strong></th></tr>
</thead>
<tbody>
<tr><td>States</td><td>7</td><td>6</td></tr>
<tr><td>Transitions</td><td>16</td><td>17</td></tr>
<tr><td>Steps, <em>n</em> = 10</td><td>66</td><td>43</td></tr>
<tr><td>Steps, <em>n</em> = 20</td><td>231</td><td>83</td></tr>
<tr><td>Steps, <em>n</em> = 50</td><td>1,326</td><td>203</td></tr>
<tr><td>Steps, <em>n</em> = 100</td><td>5,151</td><td>403</td></tr>
</tbody>
</table>
</div>

<figure>
{% include multitape-turing-machines/steps.svg %}
<figcaption class="caption"><strong>Figure 5:</strong> Number of steps each machine takes to accept a palindrome of length <em>n</em>, from 0 to 100.</figcaption>
</figure>

On a palindrome of length $$n \geq 1$$, the single-tape machine takes exactly $$(n+1)(n+2)/2$$ steps and the two-tape machine $$4n + 3$$, which overtakes it at length 6. At length 100 the single-tape machine takes 5,151 steps against 403, almost 13 times as many, and the gap keeps growing with $$n$$; by Hennie's bound, no single-tape machine can close it. The two machines are almost the same size, but the two-tape one reads like a program: copy, rewind, compare. The machines, the checks and the code behind every table and figure on this page are in [a script](https://github.com/CamiloMartinezM/CamiloMartinezM.github.io/blob/main/scripts/multitape_turing_machines.py) in this site's repository.

## Perfect Squares

A larger machine decides $$\{0^{n^2} \mid n \geq 1\}$$, the strings of 0s whose length is a perfect square. It rests on the identity

$$
n^2 = 1 + 3 + 5 + \cdots + (2n - 1)
$$

so the machine builds the sums 1, 4, 9, … one odd block at a time and compares each with the input. It has three tapes: the input, which starts with a `#` that marks its left end, a tape of 0s that holds the current sum, and a tape of blocks that alternate between `X` and `Y`, the last of which has the current odd length. After each block, the machine compares the tape of 0s with the input (Table 2). If both have the same length, it accepts, and if the tape of 0s is longer, it rejects. Otherwise it writes the next block, two symbols longer than the last, appends as many 0s and compares again. To write a block, it marks the symbols of the last one with `S`, one at a time, writing a symbol of the other letter for each, then restores the marks and writes two more (Figure 6).

<div class="table-responsive">
<table>
<caption><strong>Table 2:</strong> The tapes each time the machine compares the tape of 0s with an input of nine 0s. With ten 0s, the fourth comparison finds sixteen and rejects.</caption>
<thead>
<tr><td></td><th><strong>Tape of 0s</strong></th><th><strong>Tape of blocks</strong></th><th><strong>Outcome</strong></th></tr>
</thead>
<tbody>
<tr><td>Comparison 1</td><td><code>0</code></td><td><code>X</code></td><td>shorter: next block</td></tr>
<tr><td>Comparison 2</td><td><code>0000</code></td><td><code>XYYY</code></td><td>shorter: next block</td></tr>
<tr><td>Comparison 3</td><td><code>000000000</code></td><td><code>XYYYXXXXX</code></td><td>same length: accept</td></tr>
</tbody>
</table>
</div>

<figure>
<div class="tm-scroll">
{% include multitape-turing-machines/perfect-squares-diagram.svg %}
</div>
<figcaption class="caption"><strong>Figure 6:</strong> The perfect-squares machine in its four phases, in the notation of Figure 2 with tape 3 last. While it writes the next block, heads 1 and 2 stay on a <code>0</code> and a blank, so the labels in that phase show tape 3 alone. <code>qr</code> rejects.</figcaption>
</figure>

The machine is defined in the library's [tests](https://github.com/caleb531/automata/blob/v9.2.0/tests/test_tm.py#L104-L230), and as `perfect_squares` it runs like any other:

```python
perfect_squares.accepts_input("#" + "0" * 9)  # True: 9 = 1 + 3 + 5
perfect_squares.accepts_input("#" + "0" * 10)  # False
```

## Approximate String Matching

Multiple tapes and nondeterminism also make some practical problems short to state as machines. Approximate string matching asks whether a string $$y$$ can be obtained from a string $$x$$ with at most $$k$$ edits, each inserting, deleting or substituting one symbol; the fewest edits that do it is the edit distance between the two. Spell checkers rank their corrections by it, and sequencing tools use it to align DNA reads with a reference genome. The machine below, `matcher`, answers the question for DNA strings and also returns the edits.

Its input is $$k$$ in unary, $$x$$ and $$y$$, separated by `|`, such as `11|ACGTACGT|CGTACGTA`. It copies the budget onto tape 3 and $$x$$ onto tape 2, so that heads 1 and 2 can then walk along $$y$$ and $$x$$ independently, while tape 4 records the edits. At each step, it chooses one operation: a match (`M`) when the two symbols agree, which moves both heads, or, while budget is left, a substitution (`S`), which also moves both heads, a deletion (`D`) of a symbol of $$x$$, which moves head 2 alone, or an insertion (`I`) of a symbol of $$y$$, which moves head 1 alone. Each edit erases one mark from tape 3, and the machine accepts when both strings are used up (Figure 7).

<figure>
<div class="tm-scroll">
{% include multitape-turing-machines/matcher-diagram.svg %}
</div>
<figcaption class="caption"><strong>Figure 7:</strong> The approximate matcher, in the notation of Figure 2 with its four tapes in order: the input, the copy of <em>x</em>, the budget and the edits. Here <code>a</code> and <code>b</code> stand for any of <code>A</code>, <code>C</code>, <code>G</code> and <code>T</code>, and the same letter on one line is the same symbol. In <code>qa</code>, the machine chooses a match (<code>M</code>), a substitution (<code>S</code>), a deletion (<code>D</code>) or an insertion (<code>I</code>).</figcaption>
</figure>

In the machine's definition, this loop builds the transitions of `qa`:

```python
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
```

On the example, the machine accepts with its edits on tape 4: delete the first `A`, match the next seven symbols and insert an `A` at the end, which is how a read shifted by one position lines up with its reference.

```python
(config,) = matcher.read_input("11|ACGTACGT|CGTACGTA")
config.print()
```

```text
qf:
> Tape 1: 11|ACGTACGT|CGTACGTA#
                              ^
> Tape 2: $ACGTACGT#
                   ^
> Tape 3: $###
          ^
> Tape 4: DMMMMMMMI#
                   ^
```

Running it with $$k = 0, 1, 2, \ldots$$ until it accepts finds the edit distance itself. A branch takes at most $$m + n$$ steps to align strings of lengths $$m$$ and $$n$$, so a machine that could guess for free would align them in linear time. The library has to try the branches one after another, though (Table 3). With a budget equal to the edit distance, the search visits fewer configurations than the $$(m+1)(n+1)$$ cells that the standard dynamic program fills [\[Wagner & Fischer, 1974\]](https://doi.org/10.1145/321796.321811), but each extra unit of budget roughly triples it, while the dynamic program does the same work for every $$k$$. Nondeterminism makes the problem easy to state; dynamic programming makes it cheap to solve.

<div class="table-responsive">
<table>
<caption><strong>Table 3:</strong> Configurations the search visits for <code>ACGTACGT</code> and <code>CGTACGTA</code>, whose edit distance is 2, as the budget <em>k</em> grows. The dynamic program fills 81 cells for every <em>k</em>.</caption>
<thead>
<tr><td></td><th><strong>Result</strong></th><th><strong>Configurations visited</strong></th></tr>
</thead>
<tbody>
<tr><td><em>k</em> = 1</td><td>rejected</td><td>32</td></tr>
<tr><td><em>k</em> = 2</td><td>accepted</td><td>61</td></tr>
<tr><td><em>k</em> = 3</td><td>accepted</td><td>188</td></tr>
<tr><td><em>k</em> = 4</td><td>accepted</td><td>548</td></tr>
<tr><td><em>k</em> = 5</td><td>accepted</td><td>1,681</td></tr>
</tbody>
</table>
</div>

## Copyright & Credits

&copy; [automata](https://github.com/caleb531/automata) was written by [Caleb Evans](https://github.com/caleb531), who maintains it with [Eliot W. Robson](https://github.com/eliotwrobson), and is released under the MIT license. The library is described in [\[Evans & Robson, 2023\]](https://doi.org/10.21105/joss.05759) in the Journal of Open Source Software.

_For more details, please refer to the project's [GitHub repository](https://github.com/caleb531/automata)._
