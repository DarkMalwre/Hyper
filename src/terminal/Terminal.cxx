#include "Terminal.h"
#include <iostream>

using namespace Hyper;
using namespace std;

void Terminal::Print(const string& dataText, bool error) {
    if (error) {
        cout << dataText << "\n";
        return;
    }

    cerr << dataText << "\n";
}
