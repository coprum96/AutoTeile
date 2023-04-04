import { Button } from "@mantine/core";
import React from "react";
import { FacebookIcon } from "../../Assets/Icons/FacebookIcon";
import { GoogleIcon } from "../../Assets/Icons/GoogleIcon";

export function GoogleButton(props) {
    return (
        <Button
            leftIcon={<GoogleIcon />}
            variant="default"
            color="gray"
            {...props}
        />
    );
}
// not using kept for future use
export function FacebookButton(props) {
    return (
        <Button
            leftIcon={<FacebookIcon />}
            sx={(theme) => ({
                backgroundColor: "#4267B2",
                color: "#fff",
                "&:hover": {
                    backgroundColor: theme.fn.darken("#4267B2", 0.1),
                },
            })}
            {...props}
        />
    );
}
// not using kept for future use
