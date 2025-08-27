import clsx from "clsx"

const Card = ({ title, isObjectHere }) => {
    return (
        <div className={clsx("w-20 aspect-square text-center flex justify-center items-center",
            { 'bg-red-700 animate-pulse': isObjectHere },
            { 'bg-green-600': !isObjectHere }
        )}>
            <h1 className="font-bold">{title}</h1>
        </div>
    )
}

export default Card