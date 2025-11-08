# Bayan Tutorial (EN) — Part 3.B: Logic Programming — Part 2 (Rules, Recursion, Lists)

> Quick Nav: [PART1](03_LOGIC_PROGRAMMING_EN_PART1.md) | [PART2](03_LOGIC_PROGRAMMING_EN_PART2.md) | [PART3](03_LOGIC_PROGRAMMING_EN_PART3.md) | [PART4](03_LOGIC_PROGRAMMING_EN_PART4.md)

## 6) Composite Rules
```bayan
hybrid {
    rule ancestor(X,Y) :- parent(X,Y).
    rule ancestor(X,Y) :- parent(X,Z), ancestor(Z,Y).
}
```

## 7) Recursion (path)
```bayan
hybrid {
    fact edge(a, b). fact edge(b, c). fact edge(c, d).
    rule path(X,Y) :- edge(X,Y).
    rule path(X,Y) :- edge(X,Z), path(Z,Y).
}

query path(a, ?N).
```

## 8) Lists in Logic
```bayan
hybrid {
    rule list_member(X, [X|_]).
    rule list_member(X, [_|T]) :- list_member(X, T).
}

query list_member(2, [1,2,3]).
```

## 9) Logical Operations
```bayan
hybrid {
    fact likes("Ali", tea). fact likes("Sara", coffee).
    rule tea_lover(X)   :- likes(X, tea).
    rule coffee_lover(X):- likes(X, coffee).
}

query tea_lover(?P).
query coffee_lover(?P).
```

