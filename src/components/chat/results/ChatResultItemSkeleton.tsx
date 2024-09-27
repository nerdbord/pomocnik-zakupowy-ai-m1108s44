export const ChatResultItemSkeleton = () => {
    return (
      <li
        className="card skeleton card-compact mb-8 max-w-[250px] bg-[#333] shadow-xl"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      >
        <figure className="h-[120px] w-[250px]"></figure>
        <div className="card-body flex flex-col justify-between">
          <h2 className="card-title text-sm"></h2>
          <div className="mt-auto">
            <p className="mb-2 text-right text-xs"></p>
            <div className="card-actions skeleton justify-start bg-[#333]">
              <button className="btn-skeleton btn-xs h-[40px] w-full"></button>
            </div>
          </div>
        </div>
      </li>
    );
}