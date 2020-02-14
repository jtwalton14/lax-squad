#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/opencv.hpp>
#include <iostream>
#include <vector>

using namespace cv;
using namespace std;

vector <string> colors = { "red", "yellow", "green","blue", "pink" };
vector <int> hueVal = {  180,  30 , 60 , 120 , 160 } ;
unsigned char colorShift(unsigned char h, int left, int middle, int right);
unsigned char blueShift(unsigned char h, int hue_shift);
unsigned char greenShift(unsigned char h, int hue_shift);
unsigned char redShift(unsigned char h, int hue_shift);

int main()

{
   
    
        //open file
        Mat img = imread("img/rgbWheel.jpg");
           for (int leftColor = 0; leftColor < colors.size(); leftColor++) {
           for( int middleColor = 0; middleColor < colors.size(); middleColor++) {
               for (int rightColor = 0; rightColor < colors.size(); rightColor++) {
                   Mat hsv;
                   cvtColor(img, hsv, COLOR_BGR2HSV);

                   for (int j = 0; j < img.rows; j++)
                   {
                       for (int i = 0; i < img.cols; i++)
                       {
                           unsigned char h = hsv.at<Vec3b>(j, i)[0];
                           h = colorShift(h, leftColor, middleColor, rightColor);
                           hsv.at<Vec3b>(j, i)[0] = h;
                       }
                   }

                   //saveFile
                   Mat output;
                   cvtColor(hsv, output, COLOR_HSV2BGR);
                   string fileName = "output/" + colors[leftColor] + "_" + colors[middleColor] + "_" + colors[rightColor] + ".jpg";
                   imwrite(fileName, output);
            

           }//rightColor
           }//leftColo
       }//leftColor


   return 0;
}
    
    
    
unsigned char colorShift(unsigned char h, int left, int middle, int right){

        if (h < 150 && h > 80) {
             h = blueShift(h, hueVal[left]);
        }
    
        if (h < 90 && h > 30) {
            h = greenShift(h, hueVal[middle]);
        }

        if (h < 30 || h > 150) {
            h = redShift(h, hueVal[right]);
        }
    
    return h;
    }

unsigned char blueShift(unsigned char h, int hue_shift) {
    if (h + hue_shift > 120)
        h = (h + hue_shift) - 120;
    else
        h = h + hue_shift;
   
   return h;
}

unsigned char greenShift(unsigned char h, int hue_shift) {
    if (h + hue_shift > 60)
        h = (h + hue_shift) - 60;
    else
        h = h + hue_shift;

        return h;
}

unsigned char redShift(unsigned char h, int hue_shift) {
    if (h + hue_shift > 180)
        h = (h + hue_shift) - 180;
    else
        h = h + hue_shift;

   return h;

    }
    
   
 
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /* do {
        for (int section = 0; section < 3; section++) {
            for (int mainColor = 0; mainColor < ColorEnum.length; mainColor++) {

                if (section == 0) {             
                    for (int j = 0; j < img.rows; j++)
                    {
                        for (int i = 0; i < img.cols; i++)
                        {
                            h = hsv.at<Vec3b>(j, i)[0];
                            if (h < 150 && h > 80) {
                               blueShift(h, ColorEnum[mainColor].hueVal);
                            }
                        }
                    }
                }

                if (section == 1) {
                    for (int j = 0; j < img.rows; j++)
                    {
                        for (int i = 0; i < img.cols; i++)
                        {
                            h = hsv.at<Vec3b>(j, i)[0];
                            if (h < 90 && h > 30) {
                                h = greenShift(h, ColorEnum[mainColor].hueVal);
                            }
                        }
                    }
                }

                if (section == 2) {
                    for (int j = 0; j < img.rows; j++)
                    {
                        for (int i = 0; i < img.cols; i++)
                        {
                            if (h < 30 || h > 150) {
                                h = redShift(h, ColorEnum[mainColor].hueVal);
                            }
                        }
                    }
                }
            }
        }
    } while (not end of file)      

    return 0;*/
/*
void saveImage(hsv,  img , COLOR_HSV2BGR) {
    cvtColor(hsv, img, COLOR_HSV2BGR);
    imwrite("img", img);
    waitKey(0);
}

unsigned char blueShift(unsigned char h, unsigned char hue_shift) { 
    if (h + hue_shift > 120)
        h = (h + hue_shift) - 120;
    else
        h = h + hue_shift;

    hsv.at<Vec3b>(j, i)[0] = h;
    saveImage(figure out how to send the stuff);
}

unsigned char greenShift(unsigned char h, unsigned char hue_shift) {
    if (h + hue_shift > 60)
        h = (h + hue_shift) - 60;
    else
        h = h + hue_shift;

    hsv.at<Vec3b>(j, i)[0] = h;

    for (int color = 0; color < ColorEnum.length; color++) {
        for (int j = 0; j < img.rows; j++)
        {
            for (int i = 0; i < img.cols; i++)
            {
                h = hsv.at<Vec3b>(j, i)[0];
                if (h < 150 && h > 80) {
                    blueShift(h, ColorEnum[color].hueVal);
                }
            }
        }

    }
}

unsigned char redShift(unsigned char h, unsigned char hue_shift) {
    if (h + hue_shift > 180)
        h = (h + hue_shift) - 180;
    else
        h = h + hue_shift;

    hsv.at<Vec3b>(j, i)[0] = h;

    for (int color = 0; color < ColorEnum.length; color++) {
        for (int j = 0; j < img.rows; j++)
        {
            for (int i = 0; i < img.cols; i++)
            {
                h = hsv.at<Vec3b>(j, i)[0];
                if (h < 150 && h > 80) {
                    greenShift(h, ColorEnum[color].hueVal);
                }
            }
        }

    }
}*/
