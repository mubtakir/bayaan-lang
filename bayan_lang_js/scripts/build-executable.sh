#!/bin/bash

# Build Executable Script for Bayan
# سكريبت بناء الملف التنفيذي للبيان

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🌍 Bayan Executable Builder - بناء ملف تنفيذي للبيان   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if file argument is provided
if [ -z "$1" ]; then
    echo -e "${RED}❌ Error: No input file specified${NC}"
    echo -e "${YELLOW}Usage: ./build-executable.sh <file.bn> [platform]${NC}"
    echo ""
    echo "Examples:"
    echo "  ./build-executable.sh myapp.bn"
    echo "  ./build-executable.sh myapp.bn linux"
    echo "  ./build-executable.sh myapp.bn macos"
    echo "  ./build-executable.sh myapp.bn windows"
    echo "  ./build-executable.sh myapp.bn all"
    echo ""
    exit 1
fi

INPUT_FILE="$1"
PLATFORM="${2:-linux}"  # Default to linux
BASENAME=$(basename "$INPUT_FILE" .bn)
OUTPUT_JS="${BASENAME}.js"

# Check if input file exists
if [ ! -f "$INPUT_FILE" ]; then
    echo -e "${RED}❌ Error: File not found: $INPUT_FILE${NC}"
    exit 1
fi

echo -e "${GREEN}📄 Input file: $INPUT_FILE${NC}"
echo -e "${GREEN}🎯 Target platform: $PLATFORM${NC}"
echo ""

# Step 1: Check if bayan command exists
echo -e "${BLUE}[1/4] Checking Bayan installation...${NC}"
if ! command -v bayan &> /dev/null; then
    echo -e "${RED}❌ Error: 'bayan' command not found${NC}"
    echo -e "${YELLOW}Please install Bayan first:${NC}"
    echo "  cd /path/to/bayan"
    echo "  npm install"
    echo "  npm run build"
    echo "  npm link"
    exit 1
fi
echo -e "${GREEN}✅ Bayan is installed${NC}"
echo ""

# Step 2: Compile .bn to .js
echo -e "${BLUE}[2/4] Compiling $INPUT_FILE to JavaScript...${NC}"
if bayan compile "$INPUT_FILE" -o "$OUTPUT_JS"; then
    echo -e "${GREEN}✅ Compiled successfully: $OUTPUT_JS${NC}"
else
    echo -e "${RED}❌ Compilation failed${NC}"
    exit 1
fi
echo ""

# Step 3: Check if pkg is installed
echo -e "${BLUE}[3/4] Checking pkg installation...${NC}"
if ! command -v pkg &> /dev/null; then
    echo -e "${YELLOW}⚠️  'pkg' not found. Installing...${NC}"
    npm install -g pkg
    echo -e "${GREEN}✅ pkg installed${NC}"
else
    echo -e "${GREEN}✅ pkg is already installed${NC}"
fi
echo ""

# Step 4: Create executable(s)
echo -e "${BLUE}[4/4] Creating executable(s)...${NC}"

create_executable() {
    local target=$1
    local output=$2
    
    echo -e "${YELLOW}  Building for $target...${NC}"
    if pkg "$OUTPUT_JS" --targets "$target" --output "$output"; then
        echo -e "${GREEN}  ✅ Created: $output${NC}"
        
        # Make executable on Unix systems
        if [[ "$target" != *"win"* ]]; then
            chmod +x "$output"
        fi
        
        # Show file size
        if [ -f "$output" ]; then
            SIZE=$(du -h "$output" | cut -f1)
            echo -e "${GREEN}     Size: $SIZE${NC}"
        fi
    else
        echo -e "${RED}  ❌ Failed to create executable for $target${NC}"
    fi
}

case "$PLATFORM" in
    linux)
        create_executable "node18-linux-x64" "${BASENAME}-linux"
        ;;
    macos|mac)
        create_executable "node18-macos-x64" "${BASENAME}-macos"
        ;;
    windows|win)
        create_executable "node18-win-x64" "${BASENAME}-windows.exe"
        ;;
    all)
        create_executable "node18-linux-x64" "${BASENAME}-linux"
        create_executable "node18-macos-x64" "${BASENAME}-macos"
        create_executable "node18-win-x64" "${BASENAME}-windows.exe"
        ;;
    *)
        echo -e "${RED}❌ Unknown platform: $PLATFORM${NC}"
        echo -e "${YELLOW}Valid platforms: linux, macos, windows, all${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ Build completed successfully! - اكتمل البناء بنجاح!  ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Show how to run
echo -e "${BLUE}📦 Generated files:${NC}"
ls -lh "${BASENAME}"* 2>/dev/null | grep -v ".bn" | grep -v ".js" || true
echo ""

echo -e "${BLUE}🚀 To run your executable:${NC}"
case "$PLATFORM" in
    linux)
        echo -e "   ${YELLOW}./${BASENAME}-linux${NC}"
        ;;
    macos|mac)
        echo -e "   ${YELLOW}./${BASENAME}-macos${NC}"
        ;;
    windows|win)
        echo -e "   ${YELLOW}${BASENAME}-windows.exe${NC}"
        ;;
    all)
        echo -e "   Linux:   ${YELLOW}./${BASENAME}-linux${NC}"
        echo -e "   macOS:   ${YELLOW}./${BASENAME}-macos${NC}"
        echo -e "   Windows: ${YELLOW}${BASENAME}-windows.exe${NC}"
        ;;
esac
echo ""

# Cleanup option
echo -e "${BLUE}🧹 To clean up intermediate files:${NC}"
echo -e "   ${YELLOW}rm $OUTPUT_JS${NC}"
echo ""

