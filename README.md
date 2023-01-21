# D3jsFun
Display workload balance using d3 js

How I saved hundreds of hours of computing time by workload balance between shards.

Before balancing the workload it was a normal splitting of the number of tasks between shards. But without taking into consideration the execution time for every task, shards will be unbalanced and very often will happen that a shard will finish the work and wait and do nothing when other shards still doing the work.
![image](https://user-images.githubusercontent.com/48862142/213881940-96970f93-167a-440b-98b0-c96a0b5506d1.png)

If we take into consideration the execution time for each task we can achieve a perfect balance of workload between shards.

![image](https://user-images.githubusercontent.com/48862142/213881950-126200d8-6034-4ccc-a858-4775f33553c1.png)
