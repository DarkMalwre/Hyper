#include "../src/terminal/Terminal.h"
#include "../src/json/JSON.h"
#include <iostream>

using namespace std;

int main() {
    Hyper::Terminal::Print("hey");
    Hyper::JSON::Serialize();

    return 0;
}
