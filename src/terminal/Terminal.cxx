#include "Terminal.h"
#include "../stringUtil/StringUtil.h"
#include <iostream>
#include <algorithm>
#include <vector>

using namespace Hyper;
using namespace std;

bool systemCLSInitDone = false;

void Terminal::Print(const string& dataText, bool error) {
    if (error) {
        cerr << dataText << "\n";
        return;
    }

    cout << dataText << "\n";
}

void Terminal::Log(const string& message) {
    Print("[Info] " + message);
}

string Terminal::Colorize(const string &text, const string &data) {
    if (!systemCLSInitDone) {
        system("cls");
        systemCLSInitDone = true;
    }

    auto properties = StringUtil::Split(data, ";");
    auto bkColorID = 0;
    auto fgColorID = 0;
    auto colorChars = "";

    if (std::count(properties.begin(), properties.end(), "red")) {
        fgColorID = 31;
    } else if (std::count(properties.begin(), properties.end(), "yellow")) {
        fgColorID = 33;
    } else if (std::count(properties.begin(), properties.end(), "green")) {
        fgColorID = 32;
    } else if (std::count(properties.begin(), properties.end(), "blue")) {
        fgColorID = 34;
    } else if (std::count(properties.begin(), properties.end(), "pink")) {
        fgColorID = 35;
    } else if (std::count(properties.begin(), properties.end(), "black")) {
        fgColorID = 30;
    } else if (std::count(properties.begin(), properties.end(), "white")) {
        fgColorID = 37;
    }

    return "\033[0;" + to_string(fgColorID) + "m" + text + "\033[0m";
}
