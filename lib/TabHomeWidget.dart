import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class TabHomeWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: <Widget>[
          Container(
            width: MediaQuery.of(context).size.width,
            child: SizedBox(
              height: MediaQuery.of(context).size.height / 4,
              width: MediaQuery.of(context).size.width,
            ),
          ),
          Container(
            child: SizedBox(
              //height: 300,
                child: Center(
                  child: RichText(
                    //textHeightBehavior: TextHeightBehavior.fromEncoded(1),
              textAlign: TextAlign.center,
              text: TextSpan(
                    text: '\n',
                    style: TextStyle(
                      color: Colors.white60,
                      fontSize: 5 * MediaQuery.textScaleFactorOf(context),
                      //fontWeight: FontWeight.bold,
                    ),
                    children: <TextSpan>[
                      TextSpan(
                        text:
                        'D a p p s   B u i l d o u t',
                        style: TextStyle(
                            fontSize: 40 * MediaQuery.textScaleFactorOf(context),
                            color: Colors.black54),
                      ),
                      TextSpan(
                        text:
                            '\n\n. . . a n d    D i g i t a l    A r t',
                        style: TextStyle(
                            fontSize: 16 * MediaQuery.textScaleFactorOf(context),
                            color: Colors.black38),
                      ),
                      TextSpan(
                        text:
                        '\n\n ',
                        style: TextStyle(
                            fontSize: 60 * MediaQuery.textScaleFactorOf(context),
                            color: Colors.tealAccent),
                      ),
                      // TextSpan(
                      //   text: '\n\nD a r t    p r o g r a m m i n g ( )',
                      //   style: TextStyle(
                      //       fontSize: 12 * MediaQuery.textScaleFactorOf(context),
                      //       color: Colors.white24),
                      // ),
                    ]
              ),
            ),
                )),
          ),
        ],
      ),
    );
  }
}
