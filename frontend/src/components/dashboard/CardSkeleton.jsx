import classes from "../../styles/dashboard/CardSkeleton.module.css";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function CardSkeleton() {
    return (
        <div className={classes.container}>
            <Skeleton borderRadius={20} width={150} height={150} />
            <hr />
            <div className={classes.info}>
                {Array(5).fill(0).map((_, index) => <p key={index}>
                    <Skeleton width={100} />
                    <Skeleton />
                </p>)}
            </div>
        </div>
    );
}