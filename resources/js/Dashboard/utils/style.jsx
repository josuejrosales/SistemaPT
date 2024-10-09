import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
    const sharedStyles = {
        display: 'flex',
        gap: theme.spacing(3),
        flexWrap: 'wrap',
        overflow: 'auto',
    };

    return {
        container: {
            ...sharedStyles,
            flexDirection: 'column',
        },
        content: {
            ...sharedStyles,
            flexDirection: 'row',
        },
    };
});


export { useStyles }