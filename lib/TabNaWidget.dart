import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class TabNaWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: <Widget>[
          Container(
            width: MediaQuery.of(context).size.width / 2,
            child: SizedBox(
                width: 20,
                child: RichText(
                  textAlign: TextAlign.center,
                  text: TextSpan(
                      text: '\n\n All-In-One',
                      style: TextStyle(
                        color: Colors.black54,
                        fontSize: 35 * MediaQuery.textScaleFactorOf(context),
                        //fontWeight: FontWeight.bold,
                      ),
                      children: <TextSpan>[
                        TextSpan(
                          text: ' Mobile Sailing Instrument ',
                          style: TextStyle(
                            fontSize:
                                35 * MediaQuery.textScaleFactorOf(context),
                            color: Colors.black54,
                          ),
                        ),
                        TextSpan(
                          text: 'In The Palm Of Your Hands.',
                          style: TextStyle(
                            fontSize:
                                35 * MediaQuery.textScaleFactorOf(context),
                            color: Colors.black54,
                          ),
                        ),
                        TextSpan(
                          text: '\n\n ',
                          style: TextStyle(
                            fontSize:
                                20 * MediaQuery.textScaleFactorOf(context),
                            color: Colors.black54,
                          ),
                        ),
                      ]),
                )),
            //Image.asset('lib/assets/google-play-badge.png')),
          ),

          //Second box
          Container(
            height: MediaQuery.of(context).size.height / 1.2,
            width: MediaQuery.of(context).size.width,
            child: SizedBox(child: Image.asset("lib/assets/screen.png")),
          ),

          Container(
            width: MediaQuery.of(context).size.width / 2,
            child: SizedBox(
                child: RichText(
              textAlign: TextAlign.center,
              text: TextSpan(
                  text: '',
                  style: TextStyle(
                    color: Colors.white60,
                    fontSize: 30 * MediaQuery.textScaleFactorOf(context),
                    //fontWeight: FontWeight.bold,
                  ),
                  children: <TextSpan>[
                    TextSpan(
                      text: '\n\n ',
                      style: TextStyle(
                        fontSize: 5 * MediaQuery.textScaleFactorOf(context),
                        color: Colors.white60,
                      ),
                    ),
                    TextSpan(
                      text:
                          'The app features an accurate compass and you can entry, edit and delete '
                              'logs of all your passages. Writing the logbook is now easier, faster and automated...',
                      style: TextStyle(
                        fontSize: 20 * MediaQuery.textScaleFactorOf(context),
                        color: Colors.black38,
                      ),
                    ),
                    TextSpan(
                      text: '\n\n',
                      style: TextStyle(
                        fontSize: 20 * MediaQuery.textScaleFactorOf(context),
                      ),
                    ),
                  ]),
            )),
            //Image.asset('lib/assets/google-play-badge.png')),
          ),

          Container(
            height: MediaQuery.of(context).size.height / 1.2,
            width: MediaQuery.of(context).size.width,
            child: SizedBox(child: Image.asset("lib/assets/na_.png")),
          ),

          Container(
            //height: MediaQuery.of(context).size.height / 1.2,
            width: MediaQuery.of(context).size.width / 6,
            child: SizedBox(
                child: RichText(
                  textAlign: TextAlign.center,
                  text: TextSpan(
                      text: '\n ',
                      style: TextStyle(
                        color: Colors.white60,
                        fontSize: 30 * MediaQuery.textScaleFactorOf(context),
                        //fontWeight: FontWeight.bold,
                      ),
                      children: <TextSpan>[
                        TextSpan(
                          text: '',
                          style: TextStyle(
                            fontSize: 30 * MediaQuery.textScaleFactorOf(context),
                            color: Colors.white60,
                          ),
                        ),
                      ]),
                )),
          ),


          Container(
            // height: MediaQuery.of(context).size.height / 10,
            // width: MediaQuery.of(context).size.width / 4,
            child: SizedBox(
                child: Image.asset(
              "lib/assets/google-play-badge.png",
              width: 180 * MediaQuery.textScaleFactorOf(context),
            )),
          ),


          Container(
            //height: MediaQuery.of(context).size.height / 1.2,
            width: MediaQuery.of(context).size.width / 6,
            child: SizedBox(
                child: RichText(
                  textAlign: TextAlign.center,
                  text: TextSpan(
                      text: '\n\n ',
                      style: TextStyle(
                        color: Colors.white60,
                        fontSize: 30 * MediaQuery.textScaleFactorOf(context),
                        //fontWeight: FontWeight.bold,
                      ),
                      children: <TextSpan>[
                        TextSpan(
                          text: '\n\n ',
                          style: TextStyle(
                            fontSize: 30 * MediaQuery.textScaleFactorOf(context),
                            color: Colors.white60,
                          ),
                        ),
                      ]),
                )),
          ),

        ],
      ),
    );
  }
}
