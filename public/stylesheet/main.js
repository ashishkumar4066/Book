< section >
    <
    div class = "container" >
    <
    div class = "row mt-3" >
    <%for(var i=0;i<books.length;i++){%> <
    div class = "col-md-4 mb-3 " >
    <
    div class = "card" >
    <
    div class = "card-body" >
    <
    div class = "card-img-top" >
    <
    img class = "img-fluid p-0 hvr-grow"
src = "<%=books[i].imageURL%>"
alt = ""
style = "height:400px;width:100%" >
    <
    /div> <
    h3 class = "card-title text-center p-2 text-capitalize" > <%=books[i].title%> < /h4> <
    h4 class = "text-center lead" > < i class = "fa fa-rupee px-2" > < /i><%=books[i].cost%></h
4 >
    <
    a href = "/books/<%=books[i]._id%>"
class = "btn btn-primary mt-2 mx-5 px-5" > Read More < /a> <
    /div> <
    /div> <
    /div>
<%}%> <
/div> <
/div> <
/section>