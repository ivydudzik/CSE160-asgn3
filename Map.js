let map = [
    [2, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
    [1, 0, 0, 0, 1, 0, 1, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 1, 1, 1, 0, 1, 2, 1, 0, 3, 2, 1, 0, 2, 1, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 1, 1, 0, 2, 2, 1, 0, 2, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 2, 1, 1, 0, 2, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 0, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 5, 5, 1, 0, 5, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 5, 5, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 5, 5, 1, 0, 5, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 5, 5, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 1, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 4, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 1, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 5, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 5, 5, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 5, 5, 1, 0, 5, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 0, 0, 0, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 5, 5, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 1, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 1, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 1, 2, 1, 4, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 1, 2, 4, 4, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 4, 5, 5, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 4, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 0, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 4,],
    [2, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
]