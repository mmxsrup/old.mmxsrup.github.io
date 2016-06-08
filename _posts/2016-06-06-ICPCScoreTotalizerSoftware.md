---
layout: post
title: ICPC 得点集計ソフトウェア
date: 2016-06-05 00:00:07
tags: ICPC AOJ
description: vector便利だね
---

[問題](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1147)

ある区間の中の数字の中で、最大値と最小値を除いた、数字の和の平均を出力する問題
私の考えた解き方、足さなければならない数字の数がわかるので、その分だけ配列vecorで用意して、その中に値を入れていき、その後ソートする。こうすることで、最大値と最小値を除いた和を出すことができた。他にもやり方は色々あると思う。今回の反省は問題をよく読まずにやったために結構時間がかかってしまったことである。

{% highlight c++ %}
#include <iostream>
#include <string>
#include <algorithm>
#include <functional>
#include <vector>
#include <stack>
#include <queue>
#include <set>
#include <bitset>
#include <map>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <cmath>
using namespace std;
typedef long long ll;
typedef pair<int,int> pint;
typedef vector<int> vint;
typedef vector<pint> vpint;
#define mp make_pair
#define fi first
#define se second
#define all(v) (v).begin(),(v).end()
#define rep(i,n) for(int i=0;i<(n);i++)
#define REP(i,n) for (int i=(n)-1;i>=0;i--)
#define reps(i,f,n) for(int i=(f);i<(n);i++)
#define REPS(i,f,n) for (int i=(f)-1;i>=(n);i--)
int dx[4] = {1, 0, 0, -1};
int dy[4] = {0, 1, -1, 0};

void slove(int s){
	vint v(s);
	rep(i, s) scanf("%d", &v[i]);

	sort(all(v));//sort
	ll sum = 0;
	for (int i = 1; i < s - 1; ++i)
	{
		sum += v[i];
	}
	
	printf("%lld\n", sum / (s - 2));//平均
	return;
}

int main(void){

	int s;
	cin >> s;
	while(s != 0){
		slove(s);//審判の数
		cin >> s;
	}

	return 0;
}
{% endhighlight c++ %}