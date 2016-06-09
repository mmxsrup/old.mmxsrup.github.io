---
layout: post
title: 税率変更
date: 2016-06-08 11:10:10
tags: ICPC AOJ
description: かけ算の部分を先にやって、後から割れば楽にできる
---

[問題](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1192)

## 問題
例えば2つで合計100円の商品に税をかけた時、２つの商品の合計値は変化し、それの最大値を求める問題。

## 考え方
与えられる数字が２つの税率と１つ目の税値の時の合計ちなので、まずは、何も税をかけてないときの２つの商品の値段を全探索で探し、その後、発見した税をかける前の２つの値に２つ目の税値をかけて最大値を求める

## ミス
この問題はいろいろと苦労した。理由はよくわからないがdouble型をint型に代入すると少数点以下が切り捨てされるはずだが、`29.00`をint型に代入すると`28`になり、一部正確な答えが出てこなかった。なので、double型を使わないでいい方法をした。商品は全て、自然数なので、
`pre1 = i * ((100 + pr) / 100)`のように後ろの割り算を先にしてしまうとそこで少数点以下が発生してしまい、double型を使うことになってしまったので、
`pre1 = i * (100 + pr) / 100`のように先にかけ算をして、その後割り算をすれば、最後に少数点以下が出てくるようになるので、int型のまま計算しても適切に小数点以下が処理される。（途中で小数点以下がなくならない）

{% highlight c++ %}
void slove(double pr, double ne, int sum){
	int ans = 0;
	reps(i, 1, sum + 100){//元の値段 +100は念のためある程度大きな所まで回すため
		reps(j, 1, sum + 100){//元の値段
			int pre1 = i * ((100.0 + pr) / 100.0);
			int pre2 = j * ((100.0 + pr) / 100.0);
			int presum = pre1 + pre2;//doubleで変更前の税込価格を計算する
			if(sum == presum){
				int tmp1 = i * ((100.0 + ne) / 100.0);
				int tmp2 = j * ((100.0 + ne) / 100.0);
				ans = max(ans, tmp1 + tmp2);
			}
		}
	}
	printf("%d\n", ans);
	return;
}
{% endhighlight c++ %}
以上のコードが一部答えがおかしくなるものである。先に割り算部分を行っているのでそこをdouble型を利用して計算し、その後int　型に代入を行っている。このコードでおかしくなるのは、クエリが`13 16 112`の時で、`i = 75 j = 25`この時`ans`が116になるはずだが上記のコードだと115になってしまう。`j * ((100.0 + pr) / 100.0)`の計算結果は29.0000になっていたのだが、それをint型の`pre2`に代入すると値が28になる。よくわからない。わかる人教えてください。

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

void slove(int pr, int ne, int sum){
	int ans = 0;
	//このループはやりすぎかな
	reps(i, 1, sum + 100){//元の値段 +100は念のためある程度大きな所まで回すため
		reps(j, 1, sum + 100){//元の値段
			int pre1 = i * (100 + pr) / 100;
			int pre2 = j * (100 + pr) / 100;
			int presum = pre1 + pre2;//税率変更前の値段
			if(sum == presum){
				int tmp1 = i * (100 + ne) / 100;
				int tmp2 = j * (100 + ne) / 100;
				ans = max(ans, tmp1 + tmp2);//合計値が大きければ値を更新
			}
		}
	}
	printf("%d\n", ans);
	return;
}

int main(void){
	int x, y;
	int s;
	rep(i, 10000){
		scanf("%d %d %d", &x, &y, &s);
		if(x == 0 && y == 0 && s == 0) break;
		slove(x, y, s);
	}
	return 0;
}
{% endhighlight c++ %}

{% highlight c++ %}

{% endhighlight c++ %}