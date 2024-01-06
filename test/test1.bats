# test1.bats

bats_require_minimum_version 1.5.0

setup() {
    # get the containing directory of this file
    # use $BATS_TEST_FILENAME instead of ${BASH_SOURCE[0]} or $0,
    # as those will point to the bats executable's location or the preprocessed file respectively
    DIR="$( cd "$( dirname "$BATS_TEST_FILENAME" )" >/dev/null 2>&1 && pwd )"
    # make executables in src/ visible to PATH
    PATH="$DIR/../dist:$PATH"
}

@test "first invocation" {
    # notice the missing ./
    # As we added src/ to $PATH, we can omit the relative path to `src/project.sh`.
    svgfiles2js.js --help
}

@test "failing because no svg provided" {
    run svgfiles2js.js
	[ "$status" -eq 1 ]
}

@test "failing because of varName conflict" {
    run svgfiles2js.js -s 'test/svg/*.svg' -s 'test/svgo/*.svg'
	[ "$status" -eq 1 ]
}

@test "simple usage" {
    run svgfiles2js.js -s 'test/svgo/*.svg' -o test/html/tmp/svg-bundle.js
	[ "$status" -eq 0 ]
}
