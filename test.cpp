#include "library.h"
#include <iostream>

using namespace std;

int main() {
    hello();
    hello();
    hello();

    printf("\033[NC");
    cout << "\u001b[32mbold red text\033[0m\n";

    return 0;
}
