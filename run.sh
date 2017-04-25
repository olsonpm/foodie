#! /usr/bin/env sh

cmd="${1}"
shift
gulp () {
  ./node_modules/.bin/gulp --gulpfile ./tasks/index.js "$@"
}
test () {
  ./node_modules/.bin/mocha --ui tdd "./tests/${1}.js"
}

if [ "${cmd}" = 'task' ]; then
  gulp "$@"
elif [ "${cmd}" = 'test' ]; then
  test "${1}"
else
  echo "No case for command: '${cmd}'"
fi
