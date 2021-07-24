import 'package:flutter/material.dart';
import 'TabProfileWidget.dart';
import 'TabHomeWidget.dart';
import 'TabNaWidget.dart';



void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '@dcoldeira',
      theme: ThemeData(),
      home: MyHomePage(title: 'dcoldeira'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key,  required this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _currentIndex = 0;
  final List<Widget> _children = [
    TabHomeWidget(),
    TabNaWidget(),
    TabProfileWidget(),
  ];


  void onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    }
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.black54,
          title: SizedBox(
            child: RichText(
              text: TextSpan(
                  text: 'dcoldeira ',
                  style: TextStyle(
                    color: Colors.grey,
                    fontSize: 25,
                    fontWeight: FontWeight.bold,
                  ),
                  children: <TextSpan>[
                    TextSpan(
                      text: '  D a r t / F u t t e r     P r o g r a m m e r',
                      style: TextStyle(fontSize: 12),
                    ),
                  ]
              ),
            ),
            height: 35,
          ),
          toolbarHeight: 50,
        ),
        body: _children[_currentIndex],

        bottomNavigationBar: SizedBox(
            height: 75,
          child: BottomNavigationBar(
              onTap: onTabTapped,
              currentIndex: _currentIndex,
              selectedItemColor: Colors.black26,
              unselectedItemColor: Color(0xFFF434A50),
              items: [
            BottomNavigationBarItem(
              icon: new Icon(Icons.home),
              label: 'Home',
              tooltip: ''
            ),

            BottomNavigationBarItem(
              icon: new Icon(Icons.apps_outlined),
              //new Image.asset("lib/assets/icon.png"),
              label: 'Apps',
              tooltip: '',
            ),

            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              label: 'dcoldeira',
              tooltip: ''
            )
          ]
          ),
        )
    );
  }
}
