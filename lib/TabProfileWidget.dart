import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class TabProfileWidget extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(

        children: <Widget>[


          Container(
            width: MediaQuery.of(context).size.width,
            child: SizedBox(
              width: 15,
                child: RichText(
                  textAlign: TextAlign.center,
                  text: TextSpan(
                      text: '\n\n',
                      style: TextStyle(
                        color: Colors.black54,
                        fontSize: 20*MediaQuery.textScaleFactorOf(context),
                        //fontWeight: FontWeight.bold,
                      ),
                      children: <TextSpan>[
                        TextSpan(
                          text:
                          'Hi!',
                          style: TextStyle(
                            fontSize: 40*MediaQuery.textScaleFactorOf(context),
                            color: Colors.black54,
                          ),
                        ),
                        TextSpan(
                          text:
                          '\n\n \n\nI am David Coldeira ',
                          style: TextStyle(
                            fontSize: 30*MediaQuery.textScaleFactorOf(context),
                            color: Colors.black38,
                          ),
                        ),

                        TextSpan(
                          text:
                          '(dcoldeira) ',
                          style: TextStyle(
                            fontSize: 25*MediaQuery.textScaleFactorOf(context),
                            color: Colors.black38,
                            fontWeight: FontWeight.bold,
                          ),
                        ),

                        TextSpan(
                          text:
                          'and I am available for freelance work. ',
                          style: TextStyle(
                            fontSize: 30*MediaQuery.textScaleFactorOf(context),
                            color: Colors.black38,
                          ),
                        ),

                      ]),
                )),
            //Image.asset('lib/assets/google-play-badge.png')),
          ),

//implements
          Container(
            //height: MediaQuery.of(context).size.height / 1.2,
           // width: MediaQuery.of(context).size.width/3,
            child: SizedBox(
                width: MediaQuery.of(context).size.width/2,
                child:
                RichText(
                  textAlign: TextAlign.center,
                  text: TextSpan(
                      text: '\n\n \n\n',
                      style: TextStyle(
                        color: Colors.black38,
                        fontSize: 10*MediaQuery.textScaleFactorOf(context),
                        //fontWeight: FontWeight.bold,
                      ),
                      children: <TextSpan>[

                        TextSpan(
                          text:
                          'I am a Dart/Flutter developer. Flutter is a UI toolkit for crafting beautiful, natively compiled applications for mobile, web, and desktop. ',
                          style: TextStyle(
                            fontSize: 20*MediaQuery.textScaleFactorOf(context),

                          ),
                        ),

                        TextSpan(
                          text:
                          '\n\n \n\n \n\nLet me help you develop your ideas.',
                          style: TextStyle(
                            fontSize: 18*MediaQuery.textScaleFactorOf(context),
                            //fontWeight: FontWeight.bold,
                            color: Colors.black54

                          ),
                        ),

                        TextSpan(
                          text:
                          ' \n\n ',
                          style: TextStyle(
                            fontSize: 18*MediaQuery.textScaleFactorOf(context),
                              color: Colors.black38,
                           // fontWeight: FontWeight.bold,

                          ),
                        ),

                      ]),
                )
            ),
          ),
        ],
      ),
    );

  }
}