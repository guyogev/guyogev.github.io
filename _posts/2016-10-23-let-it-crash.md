---
layout: post
title:  "Let It Crash!"
subtitle: "Elixir's supervision trees"
date:   2016-10-23 21:29:43 +0200
css_files: [global, post]
---

At this blog post we'll discuses one of Elixir greatest features - Supervisors & Supervision trees, the engine behind Elixir's `let it crash` motto.

### What is a supervisor?

A supervisor is a process which watches other processes, which we refer to as child processes, and make sure they are always alive.

### What is a supervision tree?

Supervisors are used to build a hierarchical process structure called a supervision tree.  
Supervision trees are a nice way to structure fault-tolerant applications.

### supervision strategies

The supervision strategy dictates what happens when one of the children crashes.

### Demo

First we'll define a simple `hello world` genServer.

{% highlight elixir %}
defmodule App.Child do
  use GenServer
  require Logger

  ################## Client API ##################

  def start_link(name) do
    GenServer.start_link(__MODULE__, name, [])
  end

  def say_hey(server) do
    GenServer.call(server, {:say_hey})
  end

  def kill(server) do
    GenServer.cast(server, {:announce_death})
    GenServer.stop(server)
  end


  ################## Server Callbacks ##################

  def init(name) do
    Logger.debug "Starting App.Child with name #{name}!"
    {:ok, %{name: name}}
  end

  def handle_call({:say_hey}, _from, state) do
    msg = "'#{state[:name]}' says hey!"
    Logger.info msg
    {:reply, {:ok, msg}, state}
  end

  def handle_cast({:announce_death}, state) do
    Logger.warn "'#{state[:name]}' is dying!"
      {:noreply, state}
  end
end
{% endhighlight %}


Now we can create a bunch of child processes

{% highlight elixir %}
worker(App.Child, "child_1", [id: "child_1"])
{% endhighlight %}


Creating a Supervisor process is very simple too

{% highlight elixir %}
children = [
  worker(App.Child, "child_1", [id: "child_1"]),
  worker(App.Child, "child_2", [id: "child_2"])
  ]
Supervisor.start_link(children, strategy: strategy)
{% endhighlight %}


In order to put it all together, we'll create a simple program that lunches a few child process, randomly killing them. Very G.R.R. Martin Like :)

{% highlight elixir %}
defp create_supervision_tree(strategy) do
  children = create_children(10)
  {:ok, sup_pid} = Supervisor.start_link(children, strategy: strategy)
  sup_pid
end

defp create_children(n) do
  (1..n)
    |> Enum.map(fn(i) ->
      name = "child_#{i}"
      worker(App.Child, [name], [id: name])
    end)
end

def main_loop(sup_pid) do
  children_pids = Supervisor.which_children(sup_pid) |> Enum.map(&(elem(&1, 1)))
  kill_round(children_pids)
  main_loop(sup_pid)
end

defp kill_round(children_pids) do
  children_pids
    |> Enum.each(fn(c) ->
        random_killer(c)
    end)
end

defp random_killer(child_pid) do
  if Process.alive? child_pid do
    case Enum.random 1..10 do
      1 -> App.Child.kill(child_pid)
      _ -> App.Child.say_hey(child_pid)
    end
    :timer.sleep(1000)
  end
end
{% endhighlight %}


Thats it, whenever a child process will die, the supervisor reacts, making sure we'll always have all children running.

Lets see how different strategies behave

{% highlight elixir %}
def one_for_one do
  sup_pid = create_supervision_tree(:one_for_one)
  spawn_link(fn() -> main_loop(sup_pid) end)
end

def one_for_all do
  sup_pid = create_supervision_tree(:one_for_all)
  spawn_link(fn() -> main_loop(sup_pid) end)
end

def rest_for_one do
  sup_pid = create_supervision_tree(:rest_for_one)
  spawn_link(fn() -> main_loop(sup_pid) end)
end
{% endhighlight %}

Lunch our console by running `iex -S mix`

{% highlight bash %}
iex(1)> App.one_for_one

11:45:27.304 [debug] Starting App.Child with name child_1!

11:45:27.304 [debug] Starting App.Child with name child_2!

11:45:27.304 [debug] Starting App.Child with name child_3!

11:45:27.304 [debug] Starting App.Child with name child_4!

11:45:27.304 [debug] Starting App.Child with name child_5!

11:45:27.304 [debug] Starting App.Child with name child_6!

11:45:27.304 [debug] Starting App.Child with name child_7!

11:45:27.305 [debug] Starting App.Child with name child_8!

11:45:27.305 [debug] Starting App.Child with name child_9!

11:45:27.305 [debug] Starting App.Child with name child_10!

11:45:27.311 [info]  'child_10' says hey!
  
11:45:28.314 [info]  'child_9' says hey!

11:45:29.315 [info]  'child_8' says hey!

11:45:30.316 [info]  'child_7' says hey!

11:45:31.317 [info]  'child_6' says hey!

...

11:45:39.325 [warn]  'child_8' is dying!

11:45:39.325 [debug] Starting App.Child with name child_8!

11:45:40.326 [info]  'child_7' says hey!

11:45:46.660 [info]  'child_6' says hey!
{% endhighlight %}

We can see that when when `child_8` dies, a new process immediately takes its place!

{% highlight bash %}
iex(2)> App.one_for_all

11:50:44.951 [debug] Starting App.Child with name child_1!

11:50:44.951 [debug] Starting App.Child with name child_2!

11:50:44.951 [debug] Starting App.Child with name child_3!

11:50:44.951 [debug] Starting App.Child with name child_4!

11:50:44.951 [debug] Starting App.Child with name child_5!

11:50:44.951 [debug] Starting App.Child with name child_6!

11:50:44.951 [debug] Starting App.Child with name child_7!

11:50:44.951 [debug] Starting App.Child with name child_8!

11:50:44.951 [debug] Starting App.Child with name child_9!

11:50:44.951 [debug] Starting App.Child with name child_10!

11:50:44.953 [info]  'child_10' says hey!

11:50:45.956 [info]  'child_9' says hey!

...

11:51:10.981 [warn]  'child_4' is dying!

11:51:10.981 [debug] Starting App.Child with name child_1!

11:51:10.981 [debug] Starting App.Child with name child_2!

11:51:10.981 [debug] Starting App.Child with name child_3!

11:51:10.981 [debug] Starting App.Child with name child_4!

11:51:10.981 [debug] Starting App.Child with name child_5!

11:51:10.981 [debug] Starting App.Child with name child_6!

11:51:10.981 [debug] Starting App.Child with name child_7!

11:51:10.981 [debug] Starting App.Child with name child_8!

11:51:10.981 [debug] Starting App.Child with name child_9!

11:51:10.981 [debug] Starting App.Child with name child_10!

11:51:11.982 [info]  'child_10' says hey!
{% endhighlight %}

This time, whenever a child process dies, **all** other child processes are killed, and the whole batch is regenerated.

{% highlight bash %}
iex(1)> App.rest_for_one

11:54:12.123 [debug] Starting App.Child with name child_1!

11:54:12.123 [debug] Starting App.Child with name child_2!

11:54:12.123 [debug] Starting App.Child with name child_3!

11:54:12.123 [debug] Starting App.Child with name child_4!

11:54:12.123 [debug] Starting App.Child with name child_5!

11:54:12.123 [debug] Starting App.Child with name child_6!

11:54:12.123 [debug] Starting App.Child with name child_7!

11:54:12.123 [debug] Starting App.Child with name child_8!

11:54:12.123 [debug] Starting App.Child with name child_9!

11:54:12.123 [debug] Starting App.Child with name child_10!

11:54:12.125 [info]  'child_10' says hey!

11:54:13.128 [info]  'child_9' says hey!

...

11:54:26.141 [warn]  'child_6' is dying!

11:54:26.141 [debug] Starting App.Child with name child_6!

11:54:26.141 [debug] Starting App.Child with name child_7!

11:54:26.141 [debug] Starting App.Child with name child_8!

11:54:26.141 [debug] Starting App.Child with name child_9!

11:54:26.141 [debug] Starting App.Child with name child_10!

11:54:27.142 [info]  'child_5' says hey!
{% endhighlight %}

This time, whenever a process dies, all child process that were spawned **after** it are regenerated.

### Conclusion

Elixir Supervision Trees allow us to create robust applications, with very little code.  
Instead of worrying about each process and make sure it never fails, let a supervisor watch it, and simply **let it crash**.

Links:

- The full code is aviable at [github](https://github.com/guyogev/elixir_supervisor_demo)  
- [Supervisor docs](http://elixir-lang.org/getting-started/mix-otp/supervisor-and-application.html)