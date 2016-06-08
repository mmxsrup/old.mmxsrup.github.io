---
layout: post
title: ディリクレの算術級数定理
date: 2016-06-07 00:12:10
tags: ICPC AOJ
description: 全探索による素数判定
---

[問題](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1141)

## 問題
互いに素な２つの数を利用した、等差数列の中で、n番目に小さい素数を求める問題。

## 考え方
単純に、`now % i == 0`を利用して、全探索して素数かどうかを判定するだけ。
素数判定箇所を`for (int i = 2; i * i <= now ; ++i)`を利用して、すこしでもループ回数が減るようにした。`now`(素数かどうかを判定する数字)に含まれる約数の中で最大のものはその数自体を除けば`√now`であるから上のようなループで大丈夫。

## ミス
オーダーがわからなかった。(今も分からない)　全探索してみたが、これでよかったのか？
はじめ`1 1 1`が与えられた時、出力として素数ではない1を出力してしまうプログラムを書いてしまった。気づいたのはテストケースに`1 1 1`があったからであり、もしなければずっと築けなかった可能性が高い。自力で見つけられるようにしたい。（どうすればいい？）

## コード

{% highlight c++ %}
/*1 1 1で　１を出力してしまった*/
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
int dx[8] = {1, 0, 0, -1, 1, 1, -1, -1};
int dy[8] = {0, 1, -1, 0, 1, -1, 1, -1};

int a, d, n;

void slove(void){
	int cnt = 0;
	int now = a;

	while(cnt != n){
		bool flag = true;//素数かどうかを判定flag
		for (int i = 2; i * i <= now ; ++i){
			if (now % i == 0){
				flag = false;//素数ではない
				break;
			}
		}
		/*1は素数ではないが上の素数判定では1もtrueとしてしまうので、now != 1を追加した*/
		if (flag == true && now != 1) cnt++;//素数発見
		now += d;//等差数列を進める
	}

	printf("%d\n", now - d);//最後に+dしてしまってるのでマイナスしておく
	return;
}

int main(void){
	rep(i, 1000){
		scanf("%d %d %d", &a, &d, &n);
		if (a == 0) break;
		slove();
	}
	return 0;
}
{% endhighlight c++ %}