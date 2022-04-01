#include "../src/terminal/Terminal.h"
#include "../src/json/JSON.h"
#include "../src/stringUtil/StringUtil.h"

using namespace std;
using namespace Hyper;

int main() {
    cout << Terminal::Colorize("Hello There :Red:", "red");

    return 0;
}
