import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { isEmail } from "validator";

const required = value => {
    if(!value) {
        return(
            <div className="alert-danger" role="alert">
                <p>This field is required</p>
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return(
            <div className="alert-danger" role="alert">
                <p>This is not a valid email</p>
            </div>
        );
    }
};

render()
{
    return (
...
    <Form
        onSubmit={handleLogin}
        ref={form}
    >
        ...
        <Input
            type="text"
            className="form-control"
        ...
        validations={[required, email]}
    />

    <CheckButton
        style={{ display: "none" }}
        ref={checkBtn}
    />
</Form>
...
);
}


    </Form>
    )
}
