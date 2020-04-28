#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/opencv.hpp>
#include <iostream>
#include <vector>
#include <fstream>

using namespace cv;
using namespace std;

vector<string> colors = {"red", "yellow", "green", "lightBlue", "darkBlue", "pink", "black", "white"};
vector<int> hueVal = {180, 30, 60, 90, 120, 160, 0, 0};
unsigned char colorShift(unsigned char h, unsigned char &s, unsigned char &l, int left, int middle, int right);
unsigned char darkBlueShift(unsigned char h, int hue_shift);
unsigned char greenShift(unsigned char h, int hue_shift);
unsigned char redShift(unsigned char h, int hue_shift);
unsigned char yellowShift(unsigned char h, int hue_shift);
unsigned char lightBlueShift(unsigned char h, int hue_shift);
unsigned char pinkShift(unsigned char h, int hue_shift);
unsigned char blackShift(unsigned char l);
unsigned char whiteShift(unsigned char l);
int findColor(string col);


int main(int argc, char *argv[])

{

    //open file
    Mat img = imread(argv[1]); // loads image from first argument
    //Will need to add variables for leftLeather and rightLeather
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
            //Will need to add variables for leftLeather and rightLeather
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
    //finds if pixel is darkBlue
    if (h < 135 && h > 105)
    {
        if (colors[left] == "black" && s > 30){
            s = 0;
            l = blackShift(l);
        }
        else if (colors[left] == "white" && s > 30){
            s = 0;
            l = whiteShift(l);
        }
        else {
            h = darkBlueShift(h, hueVal[left]);
        }
    }

    //finds if pixel is green
    else if (h < 75 && h > 45)
    {
        if (colors[middle] == "black" && s > 30){
            s = 0;
            l = blackShift(l);
        }
        else if (colors[middle] == "white" && s > 30){
            s = 0;
            l = whiteShift(l);
        }
        else {
        h = greenShift(h, hueVal[middle]);
        }
    }

    //finds if pixel is red
    else if (h <= 15 || h >= 165)
    {
        if (colors[right] == "black" && s > 30){
            s = 0;
            l = blackShift(l);
        }
        else if (colors[right] == "white" && s > 30){
            s = 0;
            l = whiteShift(l);
        }
        else {            
        h = redShift(h, hueVal[right]);
        }
    }

//finds if pixel is yellow
    else if (h < 45 && h > 15)
    {
        if (colors[right] == "black" && s > 30){ //needs updated
            s = 0;
            l = blackShift(l);
        }
        else if (colors[right] == "white" && s > 30){ //needs updated
            s = 0;
            l = whiteShift(l);
        }
        else {
        h = yellowShift(h, hueVal[right]); //needs updated
        }
    }

    //finds if pixel is lightBlue
    else if (h < 105 && h > 75)
    {
        if (colors[right] == "black" && s > 30){ //needs updated
            s = 0;
            l = blackShift(l);
        }
        else if (colors[right] == "white" && s > 30){ //needs updated
            s = 0;
            l = whiteShift(l);
        }
        else {
        h = lightBlueShift(h, hueVal[right]); //needs updated
        }
    }

    //finds if pixel is pink
    else if (h < 165 && h > 135)
    {
        if (colors[right] == "black" && s > 30){ //needs updated
            s = 0;
            l = blackShift(l);
        }
        else if (colors[right] == "white" && s > 30){ //needs updated
            s = 0;
            l = whiteShift(l);
        }
        else {
        h = pinkShift(h, hueVal[right]); //needs updated
        }
    }

    return h;
}

unsigned char darkBlueShift(unsigned char h, int hue_shift)
{
	if (h + hue_shift > 135)
		h = (h + hue_shift) - 120;
	else
		h = h + hue_shift;

	return h;
}

unsigned char greenShift(unsigned char h, int hue_shift)
{
    if (h + hue_shift > 75)
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

unsigned char yellowShift(unsigned char h, int hue_shift)
{
    if (h + hue_shift > 45)
		h = (h + hue_shift) - 30;
	else
		h = h + hue_shift;

	return h;
}

unsigned char lightBlueShift(unsigned char h, int hue_shift)
{
    if (h + hue_shift > 105)
		h = (h + hue_shift) - 90;
	else
		h = h + hue_shift;

	return h;
}

unsigned char pinkShift(unsigned char h, int hue_shift)
{
    if (h + hue_shift > 165)
		h = (h + hue_shift) - 165;
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

	if (l - light_shift <= 0) {
		l = 0;
	}
	else {
		l -= light_shift;
	}

	return l;
}

unsigned char whiteShift(unsigned char l)
{

	const unsigned char light_shift = 0;

	if (l + light_shift >= 255) {
		l = 255;
	}
	else {
		l += light_shift;
	}

	return l;
}

