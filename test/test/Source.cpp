#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/opencv.hpp>
#include <iostream>

using namespace cv;
using namespace std;

string HueName[] = { "Red", "Yellow", "Green", "Blue", "Pink" };
int HueValue[] = { 180, 30, 60, 120, 150 };

unsigned char blueShift(unsigned char h);
unsigned char greenShift(unsigned char h);
unsigned char redShift(unsigned char h);

int main()
{
	//Mat img = imread("colorWheel.jpeg");
	//Mat img = imread("flower.jpeg");
	//Mat img = imread("testPic.jpg");
	//Mat img = imread("mesh.jpg");
	Mat img = imread("colorNetTest.png");
	//Mat img = imread("rgb.jfif");

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

			if (h < 30 || h > 150) {
				h = redShift(h);
			}
			else if (h < 90 && h > 30) {
				h = greenShift(h);
			}
			else if (h < 150 && h > 90) {
				h = blueShift(h);
			}

			// Set hue.
			hsv.at<Vec3b>(j, i)[0] = h;
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

unsigned char blueShift(unsigned char h) {
	const unsigned char hue_shift = 150;

	if (h + hue_shift > 120)
		h = (h + hue_shift) - 120;
	else
		h = h + hue_shift;

	return h;
}

unsigned char greenShift(unsigned char h) {
	const unsigned char hue_shift = 30;

	if (h + hue_shift > 60)
		h = (h + hue_shift) - 60;
	else
		h = h + hue_shift;

	return h;
}

unsigned char redShift(unsigned char h) {
	const unsigned char hue_shift = 120;

	if (h + hue_shift > 180)
		h = (h + hue_shift) - 180;
	else
		h = h + hue_shift;

	return h;
}
