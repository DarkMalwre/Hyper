#include "StringUtil.h"
#include <iostream>
#include <vector>

using namespace Hyper;
using namespace std;

vector<string> StringUtil::Split(const string &rawString, const string &delimiter) {
    auto characters = std::vector<string>();

    for (int i = 0; i < rawString.length(); i++) {
        characters[i] = rawString[i];
    }

    cout << characters.size() << endl;

    if (delimiter.empty()) {
//        return const_cast<string *>(characters);
    }

    return characters;
}
