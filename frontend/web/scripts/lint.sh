WORKSPACE_LOCATION="frontend/web"
IGNORED_FILES=`cat .prettierignore | sed -E "s@\*\*@[^[:space:]]*@g"  | tr '\n' '|'`

# Github CI doesn't track upstream
if [ ! -z "$CI" ]; then
  git remote add upstream "git://github.com/${GITHUB_REPOSITORY}.git"
  git fetch
fi

COMMON_POINT="$(git merge-base origin/master HEAD)"

echo $(git diff --name-only $COMMON_POINT --diff-filter=ACMRTUXB |
grep -E "\.(js|jsx|ts|tsx)$" | tr '\n' ' ' | sed -E "s@${WORKSPACE_LOCATION}/@@g" | sed -E "s@${IGNORED_FILES}@@g" | xargs) > filestolint.txt
# grep -E "\.(js|jsx|ts|tsx)$" | tr '\n' ' ' | sed -E "s@frontend/web/@@g" | xargs) > filestolint.txt

echo '\033[1;33mDebug Info\033[0m'
echo "IGNORED FILES: ${IGNORED_FILES}"
echo -n '\e[2m'
echo $IGNORED_FILES
echo -n '\033[0m'
echo "MERGE BASE: $COMMON_POINT\n"

if [ -z $(head -c 1 filestolint.txt) ];
  then echo "There are no files to lint";
  else yarn eslint --config .eslintrc.js $(cat filestolint.txt);
fi;

rm filestolint.txt
