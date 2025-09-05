import { Pagination } from "react-bootstrap"
import { useState } from "react"
import "./pmaPagination.css"

interface PMAPaginationProps {
  numberOfItems: number;
  block: number;
  number: number;
  handleClick: (page: number) => void;
}

function PMAPagination (props: PMAPaginationProps){
    const [jumpPage, setJumpPage] = useState("")
    
    // Debug: Log the props to understand what's being passed
    console.log("PMAPagination props:", {
      numberOfItems: props.numberOfItems,
      block: props.block,
      number: props.number
    })
    
    const numPage = props.numberOfItems % props.block === 0 
      ? (props.numberOfItems / props.block) 
      : Math.floor(props.numberOfItems / props.block) + 1

    console.log("Calculated numPage:", numPage)

    const startItem = (props.number - 1) * props.block + 1
    const endItem = Math.min(props.number * props.block, props.numberOfItems)

    const handleJumpToPage = () => {
      const page = parseInt(jumpPage)
      if (page >= 1 && page <= numPage) {
        props.handleClick(page)
        setJumpPage("")
      }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleJumpToPage()
      }
    }

    // Show pagination only if there are multiple pages
    if (numPage <= 1) return (
      <div className="aurora-pagination-container">
        <div className="aurora-pagination-info">
          {props.numberOfItems > 0 
            ? `Showing all ${props.numberOfItems} items`
            : "No items to display"
          }
        </div>
      </div>
    )

    return (
      <div className="aurora-pagination-container">
        {/* Items info */}
        <div className="aurora-pagination-info">
          Showing {startItem}-{endItem} of {props.numberOfItems} items
        </div>

        {/* Main pagination */}
        <div className="aurora-pagination">
          <Pagination>
            <Pagination.First 
              disabled={props.number === 1} 
              onClick={() => props.handleClick(1)}
              title="First page"
            />
            <Pagination.Prev 
              disabled={props.number === 1} 
              onClick={() => props.handleClick(props.number - 1)}
              title="Previous page"
            />

            {/* Dynamic page numbers */}
            {props.number === numPage && numPage > 2 && (
              <Pagination.Item onClick={() => props.handleClick(numPage - 2)}>
                {numPage - 2}
              </Pagination.Item>
            )}
            
            {props.number > 1 && (
              <Pagination.Item onClick={() => props.handleClick(props.number - 1)}>
                {props.number - 1}
              </Pagination.Item>
            )}
            
            <Pagination.Item active>
              {props.number}
            </Pagination.Item>
            
            {props.number < numPage && (
              <Pagination.Item onClick={() => props.handleClick(props.number + 1)}>
                {props.number + 1}
              </Pagination.Item>
            )}
            
            {props.number === 1 && numPage > 2 && (
              <Pagination.Item onClick={() => props.handleClick(3)}>
                3
              </Pagination.Item>
            )}

            <Pagination.Next  
              disabled={props.number === numPage} 
              onClick={() => props.handleClick(props.number + 1)}
              title="Next page"
            />
            <Pagination.Last  
              disabled={props.number === numPage} 
              onClick={() => props.handleClick(numPage)}
              title="Last page"
            />
          </Pagination>
        </div>

        {/* Quick jump to page */}
        {numPage > 5 && (
          <div className="aurora-pagination-jump">
            <span>Go to:</span>
            <input
              type="number"
              min="1"
              max={numPage}
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Page"
              title={`Jump to page (1-${numPage})`}
            />
          </div>
        )}
      </div>
    )
}

export default  PMAPagination