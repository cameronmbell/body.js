//Create the object
var test;

function setup()
{
    test = new Body();
    test.AddComponent(RectCollider);
    test.AddComponent(Rigidbody);
    test.TestComponents();

    test.RemoveComponent(Rigidbody);
    test.GetComponent(RectCollider).size = new Vector2(10, 10);

    Debug.Spacer();
    test.TestComponents();
}
