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
unsigned char whiteShift(unsigned char l, unsigned char light_shift);
int findColor(string col);


int main(int argc, char *argv[])

{

    //open file
    Mat img = imread(argv[1]); // loads image from first argument
    //Will need to add variables for leftLeather and rightLeather
    int leftColor = findColor(argv[2]);
    int middleColor = findColor(argv[3]);
    int rightColor = findColor(argv[4]);
    //int leftLeather = findColor(argv[5]);
    //int rightLeather = findColor(argv[6]);


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
    //This loops through each pixel in the image and finds the hue of the picture
    //The variable in the colors array should match what color is in that place on the original picture
    //If the right string in the pocket is red, then within the else if statement for red it should look like: colors[left]
    //This will allow each section of the pocket to be one color, and be able to change each section independently of the others

    //finds if pixel is darkBlue
    if (h < 135 && h > 105)
    {
        if (colors[left] == "black" && s > 30){
            s = 0;
            l = blackShift(l);
        }
        else if (colors[left] == "white" && s > 30){
            s = 0;
            l = whiteShift(l, 100);
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
            l = whiteShift(l, 100);
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
            l = whiteShift(l, 100);
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
            l = whiteShift(l, 25);
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
            l = whiteShift(l, 25);
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
            l = whiteShift(l, 0);
        }
        else {
        h = pinkShift(h, hueVal[right]); //needs updated
        }
    }

    return h;
}

unsigned char darkBlueShift(unsigned char h, int hue_shift)
{
    //This will shift the hue of Dark Blue to any other color
    //If the color after shifting looks too light or dark, the lighting value can also be shifted
    //Example of light shifting: l = l + 10;
    //Will need to pass l to this function by reference so that it changes outside as well

	if (h + hue_shift > 135)
		h = (h + hue_shift) - 120;
	else
		h = h + hue_shift;

	return h;
}

unsigned char greenShift(unsigned char h, int hue_shift)
{
    //This will shift the hue of Green to any other color
    //If the color after shifting looks too light or dark, the lighting value can also be shifted
    //Example of light shifting: l = l + 10;
    //Will need to pass l to this function by reference so that it changes outside as well
    
    if (h + hue_shift > 75)
		h = (h + hue_shift) - 60;
	else
		h = h + hue_shift;

	return h;
}

unsigned char redShift(unsigned char h, int hue_shift)
{
    //This will shift the hue of Red to any other color
    //If the color after shifting looks too light or dark, the lighting value can also be shifted
    //Example of light shifting: l = l + 10;
    //Will need to pass l to this function by reference so that it changes outside as well
    
    if (h + hue_shift > 180)
		h = (h + hue_shift) - 180;
	else
		h = h + hue_shift;

	return h;
}

unsigned char yellowShift(unsigned char h, int hue_shift)
{
    //This will shift the hue of Yellow to any other color
    //If the color after shifting looks too light or dark, the lighting value can also be shifted
    //Example of light shifting: l = l + 10;
    //Will need to pass l to this function by reference so that it changes outside as well
    
    if (h + hue_shift > 45)
		h = (h + hue_shift) - 30;
	else
		h = h + hue_shift;

	return h;
}

unsigned char lightBlueShift(unsigned char h, int hue_shift)
{
    //This will shift the hue of Light Blue to any other color
    //If the color after shifting looks too light or dark, the lighting value can also be shifted
    //Example of light shifting: l = l + 10;
    //Will need to pass l to this function by reference so that it changes outside as well
    
    if (h + hue_shift > 105)
		h = (h + hue_shift) - 90;
	else
		h = h + hue_shift;

	return h;
}

unsigned char pinkShift(unsigned char h, int hue_shift)
{
    //This will shift the hue of Pink to any other color
    //If the color after shifting looks too light or dark, the lighting value can also be shifted
    //Example of light shifting: l = l + 10;
    //Will need to pass l to this function by reference so that it changes outside as well
    
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

unsigned char whiteShift(unsigned char l, unsigned char light_shift)
{

	if (l + light_shift >= 255) {
		l = 255;
	}
	else {
		l += light_shift;
	}

	return l;
}

