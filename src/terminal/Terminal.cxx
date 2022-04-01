#include "Terminal.h"
#include <iostream>

using namespace Hyper;
using namespace std;

void Terminal::Print(const string& dataText, bool error) {
    if (error) {
        cerr << dataText << "\n";
        return;
    }

    cout << dataText << "\n";
}

void Terminal::Log(const string& message) {
    Print("[Error] " + message);
}

string Terminal::Colorize(const string &text, const string &hex) {
    return "\033[" + hex + "m" + text + "\033[0m";
}
