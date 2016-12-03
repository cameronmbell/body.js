![body.js](https://raw.githubusercontent.com/cameron-bell/body.js/master/misc/images/Logo.png)
> Neatly integrate physics into your project

---

*Body.js is a Javascript physics library written in TypeScript 2.0 which aims to allow for a clean structured integration of physics into your project. The power of body.js shines through in the use of a component structure, where any number of physics components can be added to a body where each component will interact with others dynamically.*

A simple example of this system is as follows: You want to simulate a ball bouncing (pretty standard stuff right). A common way of implementing this with popular physics libraries is as follows:

```typescript
//Define variables holding a reference to the physics world and the engine
let world = example.world;
let engine = example.engine;

//Store the ball in a variable by creating some circle object, where the properties such as friction will be parsed through json
let ball = engine.CreateCircle(positionX, positionY, mass, { other : properties });

//Add the variable to the world
world.AddBody(ball);
```

Here are some problems with a structure like this:
1. This is not easy to learn, one must know the specific function calls to generate the desired object
2. You are merely giving the physics engine some parameters for the simulation, then leaving the rest to the engine - you lack control
3. Although this system works well for simple simulations, problems arise when much more complex simulations are required.
4. Object oriented code is the future even for the web, this style of programming is archaic.
5. Probably lot more..

Here is how the same problem approached with body.js:

```typescript
//Define event listeners from the physics engine
Time.AddUpdateCallback(Update);
Time.AddStartCallback(Update);

//This will later store the ball
let ball : Body;

//This function will be called by the time manager when the engine has been set up
function Start() : void
{
    //Everything in body.js is a body - no matter what
    ball = new Body();

    //Every body comes with a transform holding positional information
    ball.transform.position = new Vector2(10, 30);

    //From here component can be added and modified
    let collider = ball.AddComponent(CircleCollider);
    collider.radius = 0.5;
    
    //This is where is gets cool:
    //The rigidbody component will interact with a collider if present
    let rigidbody = ball.AddComponent(Rigidbody);
    rigidbody.mass = 10;
    rigidbody.friction = 0.5;
}

//Will be called every frame (frame rate independent)
function Update() : void
{
    //From here properties of the body's can be get, set or modified in real time
    //This allows for easy integration with rendering, eg:
    // context.drawRect(ball.transform.position.x, ball.transform.position.y, ball.transform.scale.x, ball.transform.scale.y);
}
```

This may seem like a tonne of code to do the exact same thing, but this approach allows for much easier physics down the track
1. Nothing mysterious going on here, it is pretty easy to understand what is happening in this program
2. Complete control over anything being done by body.js
3. The component system allows for any number of components (spring, ragdoll, rigidbody...) to interact with each other
4. OOP is deeply entrenched in body.js - gone are the days of lonely function calls

---

> How is this possible? Typescript, just typescript!

In closing:
*Whether you are simulating the universe or adding physics to a platformer - body.js gives you the tools and power to reach your goals. A diverse approach to physics concepts means that the applications of body.js are limitless.*