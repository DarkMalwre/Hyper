#include <Hyper/Terminal.h>
#include <Hyper/JSON.h>
#include <Hyper/StringUtil.h>
#include <iostream>

using namespace std;
using namespace Hyper;

int main() {
    cout << Terminal::Colorize("Hello There :Red:", "red");

    return 0;
}
