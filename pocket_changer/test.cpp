#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/opencv.hpp>
#include <iostream>
#include <vector>
#include <fstream>

using namespace cv;
using namespace std;

vector<string> colors;
vector<int> hueVal;
vector<string> images;
// vector<string> colors = {"red", "yellow", "green", "lightBlue", "darkBlue", "pink", "black", "white"};
// vector<int> hueVal = {180, 30, 60, 90, 120, 160, 0, 0};
unsigned char colorShift(unsigned char h, unsigned char &s, unsigned char &l, int left, int middle, int right);
unsigned char blueShift(unsigned char h, int hue_shift);
unsigned char greenShift(unsigned char h, int hue_shift);
unsigned char redShift(unsigned char h, int hue_shift);
unsigned char blackShift(unsigned char l);
unsigned char whiteShift(unsigned char l);
int findColor(string col);
void openFiles(vector<string> &colors, vector<int> &hueVal, vector<string> &images);

int main(int argc, char *argv[])
{
    openFiles(colors, hueVal, images);
    //open file
    string imageIndex = images[stoi(argv[1])];
    string image = "img/" + imageIndex;
    Mat img = imread(image); // loads image from first argument
    //Mat img = imread(argv[1]);
    int leftColor = findColor(argv[2]);
    int middleColor = findColor(argv[3]);
    int rightColor = findColor(argv[4]);

    Mat hsv;
    cvtColor(img, hsv, COLOR_BGR2HSV);

    for (int j = 0; j < img.rows; j++)
    {
        for (int i = 0; i < img.cols; i++)
        {
            unsigned char h = hsv.at<Vec3b>(j, i)[0];
            unsigned char s = hsv.at<Vec3b>(j, i)[1];
            unsigned char l = hsv.at<Vec3b>(j, i)[2];
            h = colorShift(h, s, l, leftColor, middleColor, rightColor);
            hsv.at<Vec3b>(j, i)[0] = h;
            hsv.at<Vec3b>(j, i)[1] = s;
            hsv.at<Vec3b>(j, i)[2] = l;
        }
    }

    //saveFile
    Mat output;
    cvtColor(hsv, output, COLOR_HSV2BGR);
    string fileName = "/home/jtwalton/lax-squad/express-api/tmtlax_api/output/" + colors[leftColor] + "_" + colors[middleColor] + "_" + colors[rightColor] + ".jpg";
    imwrite(fileName, output);
    cout << fileName;
    return 0;
}

unsigned char colorShift(unsigned char h, unsigned char &s, unsigned char &l, int left, int middle, int right)
{
    if (h < 150 && h > 80)
    {
        h = blueShift(h, hueVal[left]);

        if (colors[left] == "black" && s > 30)
        {
            s = 0;
            l = blackShift(l);
        }
        else if (colors[left] == "white" && s > 30)
        {
            s = 0;
            l = whiteShift(l);
        }
    }

    else if (h < 90 && h > 30)
    {
        h = greenShift(h, hueVal[middle]);

        if (colors[middle] == "black" && s > 30)
        {
            s = 0;
            l = blackShift(l);
        }
        else if (colors[middle] == "white" && s > 30)
        {
            s = 0;
            l = whiteShift(l);
        }
    }

    else if (h < 30 || h > 150)
    {
        h = redShift(h, hueVal[right]);

        if (colors[right] == "black" && s > 30)
        {
            s = 0;
            l = blackShift(l);
        }
        else if (colors[right] == "white" && s > 30)
        {
            s = 0;
            l = whiteShift(l);
        }
    }

    return h;
}

unsigned char blueShift(unsigned char h, int hue_shift)
{
    if (h + hue_shift > 120)
        h = (h + hue_shift) - 120;
    else
        h = h + hue_shift;

    return h;
}

unsigned char greenShift(unsigned char h, int hue_shift)
{
    if (h + hue_shift > 60)
        h = (h + hue_shift) - 60;
    else
        h = h + hue_shift;

    return h;
}

unsigned char redShift(unsigned char h, int hue_shift)
{
    if (h + hue_shift > 180)
        h = (h + hue_shift) - 180;
    else
        h = h + hue_shift;

    return h;
}

int findColor(string col)
{
    for (int i = 0; i < colors.size(); i++)
    {
        if (col == colors[i])
        {
            return i;
        }
    }

    return -1;
}

unsigned char blackShift(unsigned char l)
{

    const unsigned char light_shift = 150;

    if (l - light_shift <= 0)
    {
        l = 0;
    }
    else
    {
        l -= light_shift;
    }

    return l;
}

unsigned char whiteShift(unsigned char l)
{

    const unsigned char light_shift = 0;

    if (l + light_shift >= 255)
    {
        l = 255;
    }
    else
    {
        l += light_shift;
    }

    return l;
}

void openFiles(vector<string> &colors, vector<int> &hueVal, vector<string> &images)
{
    ifstream inFile;

    int num = 0;
    string tmp;
    int tmp2;
    string tmp3;
    inFile.open("confs/colors.txt");
    while (!inFile.eof())
    {
        inFile >> tmp;
        colors.push_back(tmp);
        inFile >> tmp2;
        hueVal.push_back(tmp2);

        ++num;
    }
    inFile.close();
    
    num = 0;
    inFile.open("confs/pockets.txt");
    while (!inFile.eof())
    {
        inFile >> tmp3;
        images.push_back(tmp3);
        ++num;
    }
    inFile.close();
}
