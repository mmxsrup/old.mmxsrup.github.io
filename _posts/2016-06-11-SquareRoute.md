---
layout: post
title: 	スクウェア・ルート
date: 2016-06-10 00:10:10
tags: ICPC AOJ
description: バケットソート　良問
---

[問題](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=2015)

## 問題
正方形がいくつあるかを求める問題。

## 考え方
縦と横それぞれ、取り得る辺の長さを全て求め、縦と横で同じ長さの積を取りそれらの和を取れば、作れる正方形の数が求められる。取り得る辺の長さをどのように扱うかであるが、辺の長さは最大でも1500000なので、`vint h(1500001)`と`vint w(1500001)`で縦と横の長を管理することにした。辺の長さと配列の添字が対応するように入れていく。こうすることで、わかりやすく管理することができた。バケットソートというらしい。

## ミス
全ての辺の長さを求める箇所だが、累積和かしゃくとり方で求めようと思ったが、あまり実装したことなかったので手間取った。
{% highlight c++ %}
for (int i = 0; i < n; ++i){
	int len = 0;
	for (int j = i; j < n; ++j){
		len += tmph[j];
		h[len]++;
	}
}
{% endhighlight c++ %}
そこで
上記のようなコードを利用すると、簡単に求められる。

## コード

{% highlight c++ %}
#include <iostream>
#include <string>
#include <algorithm>
#include <functional>
#include <vector>
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
#define reps(i,f,n) for(int i=(f);i<(n);i++)

void slove(int n, int m){
	vint tmph(1501);
	vint h(1500001);//縦の中で辺の長さをメモるための配列
	vint tmpw(1501);
	vint w(1500001);//横の中で辺の長さをメモるための配列

	//入力
	rep(i, n) scanf("%d", &tmph[i]);
	rep(i, m) scanf("%d", &tmpw[i]);

	//縦の点を二つ選ぶその２点の長さを全て、h[]に入れる
	for (int i = 0; i < n; ++i){
		int len = 0;
		for (int j = i; j < n; ++j){
			len += tmph[j];
			h[len]++;
		}
	}

	//横の点を二つ選ぶその２点の長さを全て、w[]に入れる
	for (int i = 0; i < m; ++i){
		int len = 0;
		for (int j = i; j < m; ++j){
			len += tmpw[j];
			w[len]++;
		}
	}

	//正方形の数をカウント
	ll sum = 0;
	rep(i, 1500001){
		sum += h[i] * w[i];
	}

	printf("%lld\n", sum);
	return;
}

int main(void){
	int n, m;
	while(1){
		scanf("%d %d", &n, &m);
		if(n == 0) break;
		slove(n, m);
	}
	return 0;
}
{% endhighlight c++ %}