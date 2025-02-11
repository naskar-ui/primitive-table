# /bin/sh

RED='\033[0;31m'
NC='\033[0m' # No Color

ORIGIN="git@github.com:naskar-ui/primitive-table.git"

# Check for changes to be committed
if [[ -n $(git status --porcelain) ]]; then
    echo "${RED}THERE ARE CHANGES TO BE COMMITTED.${NC}"
    exit 0
fi

set -e # Stop the script if any command fails

echo "FETCHING TAG..."
git fetch --tags >/dev/null

CURRENT_VERSION="$(git tag --list "v*" --sort=-creatordate | head -n 1)"

if [ -n "${CURRENT_VERSION}" ]; then
    echo "the latest tag => ${CURRENT_VERSION}"

    while [ -z "$NEXT_VERSION" ]; do
        echo "What kind of update do you want to release?

        1. major
        2. minor
        3. patch
        4. re-release current version"

        read -r UPDATE_TYPE

        # write version to package.json, AppVersion.ts
        if [ "$UPDATE_TYPE" = 1 ]; then
            NEXT_VERSION=$(echo "$CURRENT_VERSION" | awk -F. '{$1+=1; $2=0;$3=0; print $1"."$2"."$3}')
        elif [ "$UPDATE_TYPE" = 2 ]; then
            NEXT_VERSION=$(echo "$CURRENT_VERSION" | awk -F. '{$2+=1; $3=0; print $1"."$2"."$3}')
        elif [ "$UPDATE_TYPE" = 3 ]; then
            NEXT_VERSION=$(echo "$CURRENT_VERSION" | awk -F. '{$3+=1; print $1"."$2"."$3}')
        elif [ "$UPDATE_TYPE" = 4 ]; then
            NEXT_VERSION="$CURRENT_VERSION"
            RE_RELEASE=true
        else
            echo "'$UPDATE_TYPE' is invalid input. Try again and type only 1-4"
        fi
    done

fi

./scripts/pack-and-release.sh $ORIGIN $NEXT_VERSION
jq --arg NEXT_VERSION "$NEXT_VERSION" '.version = $NEXT_VERSION' package.json >tmp.json && mv tmp.json package.json

git add .
git commit -m "Releasing $NEXT_VERSION" >/dev/null

echo "SUCCESSFULLY RELEASE THE ${NEXT_VERSION} version tag"

CURRENT_BRANCH=$(git branch | grep \* | cut -d ' ' -f2)

echo "git push $ORIGIN $CURRENT_BRANCH"
git push $ORIGIN $CURRENT_BRANCH >/dev/null

npm publish

rm -rf dist

exit 0
