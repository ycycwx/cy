## Cy

A simple C-c C-v tool in command line.

Inspired by MACOS built-in Command-c Command-v.

## Install

Support >= nodejs v4.

Use npm
``` bash
npm i -g cyjs
```

Or use yarn
``` bash
yarn global add cyjs
```

## Usage

``` bash
# a/x1
# a/x2
# b/y1
# b/y2
# c/
ls

# clear and a/x1 in register
cy a/x1

# append new file into register
cy add a/x2

# show all file path in register
# .../a/x1
# .../a/x2
cy list

# copy a/x1 a/x2 into folder c
cy copy c

# clear register
cy reset

# add b/y1 b/y2 into register
cy b/*

# show all file path in register
# .../b/y1
# .../b/y2
cy list

# move b/y1 b/y2 into folder c
cy move c

# a/x1
# a/x2
# b/
# c/x1
# c/x2
# c/y1
# c/y2
ls

# if you want to default add file named "list" or other command, use `--ignore` or `-i` flag
cy -i list
cy --ignore a

# more command
cy --help
```

## TODO

1. command: remove
2. progress bar
3. more configurable
4. typed rewrite
