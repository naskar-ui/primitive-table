# /bin/sh

ORIGIN=$1
TAG_NAME=$2

RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
echo "${BLUE}PACKING PACKAGE FOR ${RED}${TAG_NAME}${BLUE} IS STARTED${NC}"

rm -rf dist

echo "TS compile starts"
TSC_ERRORS="$(yarn run build | grep -E 'error TS[0-9]+:')"

# print TSC error
TSC_RESULT=0
IFS=$'\n'
if [ -n "$TSC_ERRORS" ]; then
    for TSC_ERROR in $TSC_ERRORS; do
        TSC_RESULT=$((TSC_RESULT + 1))
        echo "$TSC_RESULT: $TSC_ERROR"
    done
    echo "${RED}TS Failed to Compile ${NC}"
    exit 1
fi

if [ "$TSC_RESULT" -gt 0 ]; then
    echo "${RED}TS compiler complained on $TSC_RESULT line(s)${NC}"
    echo "${BLUE}PACKING PACKAGE FOR ${RED}${TAG_NAME}${BLUE} FAILED${NC}"
    exit 2
fi

echo "TS compile success"

cd dist
git init >/dev/null
git add .
echo "git remote add origin ${ORIGIN}"
git remote add origin "${ORIGIN}"

git commit -m "Releasing $TAG_NAME" >/dev/null
echo "git tag ${TAG_NAME}"
git tag "${TAG_NAME}"
git push origin "${TAG_NAME}"

cd ..
rm -rf dist

echo "${BLUE}PACKING PACKAGE FOR ${RED}${TAG_NAME}${BLUE} IS SUCCESSFULLY FINISHED${NC}"

exit 0
