#include "StringUtil.h"
#include <iostream>
#include <vector>

using namespace Hyper;
using namespace std;

vector<string> StringUtil::Split(const string &rawString, const string &delimiter) {
    auto characters = std::vector<string>();

    for (int i = 0; i < rawString.length(); i++) {
        characters.push_back(rawString.substr(i, 1));
    }

    cout << characters.size() << endl;

    if (!delimiter.empty()) {
        auto delimiterIndex = 0;
        auto delimiterLength = delimiter.length();
        auto delimiterFound = false;

        for (auto i = 0; i < characters.size(); i++) {
            if (characters[i] == delimiter) {
                delimiterFound = true;
                delimiterIndex = i;
                break;
            }
        }

        if (delimiterFound) {
            auto firstPart = string();
            auto secondPart = string();

            for (auto i = 0; i < delimiterIndex; i++) {
                firstPart += characters[i];
            }

            for (auto i = delimiterIndex + delimiterLength; i < characters.size(); i++) {
                secondPart += characters[i];
            }

            characters.clear();
            characters.push_back(firstPart);
            characters.push_back(secondPart);
        }
    }

    return characters;
}
