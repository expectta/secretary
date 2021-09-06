//문자열 합치기
#include <iostream>
#include <string>

using std::cout; using std::endl;
using std::copy; using std::string;

int main() {
    string string1("Starting string ");
    string string2("end of the string ");

    cout << "string1:  " << string1 << endl;
    string1 += string2;
    cout << "string1:  " << string1 << endl;

    return EXIT_SUCCESS;
}
//system() 디렉토리 이동 후 명령어 사용
system("cd /Users/kjw/Desktop/secretary/ && git status");
