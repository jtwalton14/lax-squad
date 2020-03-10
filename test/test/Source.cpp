#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/opencv.hpp>
#include <iostream>
#include <vector>

using namespace cv;
using namespace std;

vector <string> colors = { "Red", "Yellow", "Green", "Blue", "Pink" };
vector <int> hueVal = { 180, 30, 60, 120, 150 };

unsigned char redShift(unsigned char h);
unsigned char yellowShift(unsigned char h);
unsigned char greenShift(unsigned char h);
unsigned char lightBlueShift(unsigned char h);
unsigned char darkBlueShift(unsigned char h);
unsigned char pinkShift(unsigned char h);
unsigned char blackShift(unsigned char l);
unsigned char whiteShift(unsigned char l);

int main()
{
	//Mat img = imread("colorWheel.jpeg");
	//Mat img = imread("flower.jpeg");
	//Mat img = imread("testPic.jpg");
	//Mat img = imread("mesh.jpg");
	//Mat img = imread("colorNetTest.png");
	//Mat img = imread("rgb.jpg");
	//Mat img = imread("threeColorNet.jpg");
	//Mat img = imread("orange_blackNet.jpg");
	Mat img = imread("rgbPocket.jpg");

	Mat hsv;
	cvtColor(img, hsv, COLOR_BGR2HSV);

	for (int j = 0; j < hsv.rows; j++)
	{
		for (int i = 0; i < hsv.cols; i++)
		{
			// Get hue. 
			// Saturation is hsv.at<Vec3b>(j, i)[1], and 
			// Value is hsv.at<Vec3b>(j, i)[2].
			unsigned char h = hsv.at<Vec3b>(j, i)[0];
			unsigned char s = hsv.at<Vec3b>(j, i)[1];
			unsigned char l = hsv.at<Vec3b>(j, i)[2];

			/*if (someVariable = black){
			
				s = 0;
				l = blackShift(l);
			
			}
			else if (someVariable = white){
			
				s = 0;
				l = whiteShift(l);
			
			}*/
			/*else*/ if ((h < 15 || h > 165) && s > 30){
				h = redShift(h);

				
			}
			else if (h < 45 && h > 15) {
				h = yellowShift(h);
			}
			else if (h < 75 && h > 45) {
				h = greenShift(h);

				//s = 0;
				//l = whiteShift(l);
			}
			else if (h < 105 && h > 75) {
				h = lightBlueShift(h);
			}
			else if (h < 135 && h > 105) {
				h = darkBlueShift(h);
			}
			else if (h < 165 && h > 135) {
				h = pinkShift(h);
			}

			// Set hue.
			hsv.at<Vec3b>(j, i)[0] = h;
			hsv.at<Vec3b>(j, i)[1] = s;
			hsv.at<Vec3b>(j, i)[2] = l;
		}
	}

	Mat output;
	cvtColor(hsv, output, COLOR_HSV2BGR);
	//imshow("img", output);
	string test = "testOutput/testPicture.png";
	imwrite(test, output);
	waitKey(0);
	return 0;
}

unsigned char redShift(unsigned char h) {
	const unsigned char hue_shift = 0;

	if (h + hue_shift > 180)
		h = (h + hue_shift) - 180;
	else
		h = h + hue_shift;

	return h;
}

unsigned char yellowShift(unsigned char h) {
	const unsigned char hue_shift = 0;

	if (h + hue_shift > 45)
		h = (h + hue_shift) - 45;
	else
		h = h + hue_shift;

	return h;
}

unsigned char greenShift(unsigned char h) {
	const unsigned char hue_shift = 30;

	if (h + hue_shift > 75)
		h = (h + hue_shift) - 75;
	else
		h = h + hue_shift;

	return h;
}

unsigned char lightBlueShift(unsigned char h) {
	const unsigned char hue_shift = 0;

	if (h + hue_shift > 105)
		h = (h + hue_shift) - 105;
	else
		h = h + hue_shift;

	return h;
}

unsigned char darkBlueShift(unsigned char h) {
	const unsigned char hue_shift = 0;

	if (h + hue_shift > 135)
		h = (h + hue_shift) - 135;
	else
		h = h + hue_shift;

	return h;
}

unsigned char pinkShift(unsigned char h) {
	const unsigned char hue_shift = 0;

	if (h + hue_shift > 165)
		h = (h + hue_shift) - 165;
	else
		h = h + hue_shift;

	return h;
}

unsigned char blackShift(unsigned char l) {

	const unsigned char light_shift = 150;
	
	if (l - light_shift <= 0) {
		l = 0;
	}
	else {
		l -= light_shift;
	}

	return l;
}

unsigned char whiteShift(unsigned char l) {

	const unsigned char light_shift = 50;

	if (l + light_shift >= 255) {
		l = 255;
	}
	else {
		l += light_shift;
	}

	return l;
}
