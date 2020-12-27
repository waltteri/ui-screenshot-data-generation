// BSElementCreation.js
// Functions for creating random Bootstrap-compliant elements with randomized contents

function create_navbar(){
    
    var elem = document.createElement("nav")
    elem.class = "navbar navbar-expand-lg navbar-dark bg-primary"
    
    
}

function create_button(){
    
    var btn_classes = [
        "btn btn-primary",
        "btn btn-secondary",
        "btn btn-success",
        "btn btn-info",
        "btn btn-warning",
        "btn btn-danger",
        "btn btn-link",
        "btn btn-primary disabled",
        "btn btn-secondary disabled",
        "btn btn-success disabled",
        "btn btn-info disabled",
        "btn btn-warning disabled",
        "btn btn-danger disabled",
        "btn btn-link disabled",
        "btn btn-outline-primary",
        "btn btn-outline-secondary",
        "btn btn-outline-success",
        "btn btn-outline-info",
        "btn btn-outline-warning",
        "btn btn-outline-danger",
        "btn btn-primary btn-lg",
        "btn btn-primary",
        "btn btn-primary btn-sm"
    ] 
    
    var elem = document.createElement("button")
    elem.innerHTML = random_string()
    elem.className = array_pick_random(btn_classes) + " " + generate_positioning_class_str()
    return elem
    
}

function create_header(){
    
    var header_names = [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
    ]
    
    var elem = document.createElement(array_pick_random(header_names))
    elem.className = generate_positioning_class_str()
    elem.innerHTML = random_string()
    return elem
    
}

function create_paragraph(class_name_empty=false, max_len=3000, skew=3){
    
    var elem = document.createElement("p")
    if(class_name_empty==false){
        elem.className = generate_positioning_class_str()
    }
    elem.innerHTML = random_string(max_len=max_len, skew=skew)
    return elem
    
}


function create_table(min_rows=2, min_columns=2, max_rows=50, max_columns=10, skew_rows=3, skew_columns=5, prob_header=0.5){
    
    var num_rows = randn_bm(min_rows, max_rows, skew_rows)
    var num_columns = randn_bm(min_columns, max_columns, skew_columns)
    
    // Here, some logic regarding the number of values in a column could be added.
    
    // Create table and add table-level styles
    var elem = document.createElement("table")
    elem.className = "table" + " " + generate_positioning_class_str()
    
    for(var r=0; r<num_rows; r++){
        
        var row = document.createElement("tr")
        
        // Add cells
        for(var c=0; c<num_columns; c++){
            
            var cell = document.createElement("td")
            cell.innerHTML = random_string(10, 200, 3)
            
            // Append cell to row
            row.appendChild(cell)
            
        }
        
        // If it's the first row, randomize the addition of a header row. Otherwise just add row to table.
        if(r==0 && Math.random()<prob_header){
            var thead = document.createElement("thead")
            thead.appendChild(row)
            elem.appendChild(thead)
        } else {
            elem.appendChild(row)
        }
        
    }
    
    return elem
    
}

function create_image(){
    
    var width = Math.floor(randn_bm(100, 600, 1.5))
    var height = Math.floor(randn_bm(100, 600, 1.5))
    
    var elem = document.createElement("div")
    elem.className = generate_positioning_class_str()
    
    var img = document.createElement("img")
    img.src="https://picsum.photos/"+width+"/"+height+"?random="+Math.floor(Math.random()*1000000)
    img.referrerPolicy = "no-referrer"
    
    elem.appendChild(img)
    
    return elem
    
}

// COMBINATIONS

function create_jumbotron(){
    
    var elem = document.createElement("div")
    elem.className = "jumbotron" + " " + generate_positioning_class_str()
    
    elem.appendChild(create_header())
    
    var num_ps = randn_bm(1, 5, 2)
    
    for(var i=0; i<num_ps; i++){
        elem.appendChild(create_paragraph(true, 500, 5))
    }
    
    elem.appendChild(create_button())
    
    return elem
    
}

function create_form(){
    
    var form_element_types = [
        "email",
        "password",
        "checkbox",
        ""
    ]
    
    let _create_form_group = () => {
        
        let form_group = document.createElement("div")
        form_group.className = "form-group"
        return form_group
        
    }
    
    let _create_email_form_group = () => {
        
        let elem = _create_form_group()
        
        let id = random_string(12, 12, 0) // Random ID
        
        // Create label
        let label = document.createElement("label")
        label.for = id
        label.textContent = random_string(0, 50, 1.5)
        
        elem.appendChild(label)
        
        // Create input
        let inp = document.createElement("input")
        inp.type = "email"
        inp.className = "form-control"
        inp.id = id
        inp.placeholder = random_string(0, 50, 1.5)
        if(Math.random()>0.5){
            inp.value = random_string(0, 50, 1.5)
        }
        
        elem.appendChild(inp)
        
        return elem
        
    }
    
    let _create_text_form_group = () => {
        
        let elem = _create_form_group()
        
        let id = random_string(12, 12, 0) // Random ID
        
        // Create label
        let label = document.createElement("label")
        label.for = id
        label.textContent = random_string(0, 50, 1.5)
        
        elem.appendChild(label)
        
        // Create input
        let inp = document.createElement("input")
        inp.type = "text"
        inp.className = "form-control"
        inp.id = id
        inp.placeholder = random_string(0, 100, 1.5)
        if(Math.random()>0.5){
            inp.value = random_string(0, 100, 1.5)
        }
        
        elem.appendChild(inp)
        
        return elem
        
    }
    
    let _create_password_form_group = () => {
        
        let elem = _create_form_group()
        
        let id = random_string(12, 12, 0) // Random ID
        
        // Create label
        let label = document.createElement("label")
        label.for = id
        label.textContent = random_string(0, 50, 1.5)
        
        elem.appendChild(label)
        
        // Create input
        let inp = document.createElement("input")
        inp.type = "password"
        inp.className = "form-control"
        inp.id = id
        inp.placeholder = random_string(0, 50, 1.5)
        if(Math.random()>0.5){
            inp.value = random_string(0, 50, 1.5)
        }
        
        elem.appendChild(inp)
        
        return elem
        
    }
    
    let _create_checkbox_form_group = () => {
        
        let elem = _create_form_group()
        
        let id = random_string(12, 12, 0) // Random ID
        
        // Create input
        let inp = document.createElement("input")
        inp.type = "checkbox"
        inp.className = "form-check-input"
        inp.id = id
        if(Math.random()>0.5){
            inp.checked = true
        }else{
            inp.checked = false
        }
        
        elem.appendChild(inp)
        
        // Create label
        let label = document.createElement("label")
        label.for = id
        label.className = "form-check-label"
        label.textContent = random_string(0, 50, 1.5)
        
        elem.appendChild(label)
        
        return elem
        
    }
    
    let _create_select_form_group = () => {
        
        let elem = _create_form_group()
        
        let id = random_string(12, 12, 0) // Random ID
        
        // Create label
        let label = document.createElement("label")
        label.for = id
        label.textContent = random_string(0, 50, 1.5)
        
        elem.appendChild(label)
        
        // Create select
        let select = document.createElement("select")
        select.className = "form-control"
        select.id = id
        
        // Add random options
        option_selected = false
        
        for(let i=randn_bm(1, 20, 1); i>0; i--){
            let option = document.createElement("option")
            option.textContent = random_string(0, 50, 1.5)
            if(option_selected==false && Math.random()>0.5){
                option_selected = true
                option.selected = true
            }
            select.appendChild(option)
        }
        
        elem.appendChild(select)
        
        return elem
        
    }
    
    let _create_select_multiple_form_group = () => {
        
        let elem = _create_form_group()
        
        let id = random_string(12, 12, 0) // Random ID
        
        // Create label
        let label = document.createElement("label")
        label.for = id
        label.textContent = random_string(0, 50, 1.5)
        
        elem.appendChild(label)
        
        // Create select
        let select = document.createElement("select")
        select.className = "form-control"
        select.id = id
        select.multiple = true
        
        // Add random options
        
        for(let i=randn_bm(1, 20, 1); i>0; i--){
            let option = document.createElement("option")
            option.textContent = random_string(0, 50, 1.5)
            if(Math.random()>0.8){
                option.selected = true
            }
            select.appendChild(option)
        }
        
        elem.appendChild(select)
        
        return elem
        
    }
    
    // Create form
    let form = document.createElement("form")
    form.className = generate_positioning_class_str()
    
    // Add elements to the form
    
    let child_functions = [
        _create_email_form_group,
        _create_text_form_group,
        _create_password_form_group,
        _create_checkbox_form_group,
        _create_select_form_group,
        _create_select_multiple_form_group
    ]
    
    for(let i=randn_bm(1, 10, 1.5); i>0; i--){
        form.appendChild(
            array_pick_random(child_functions)()
        )
    }
    
    // Add submit button to form?
    if(Math.random()>0.5){
        var submit = document.createElement("input")
        submit.type = "submit"
        submit.value = random_string(0, 20, 1)
        form.appendChild(submit)
    }
    
    return form
    
}

function create_list(){
    
    let ul = document.createElement("ul")
    
    for(let i=randn_bm(1, 20, 1.5); i>0; i--){
        
        // Create option
        let opt = document.createElement("li")
        opt.textContent = random_string(0, 300, 3)
        
        // Add sublist?
        if(Math.random()>0.95){
            opt.appendChild(create_list())
        }
            
        //Append
        ul.appendChild(opt)
        
    }
    
    return ul
    
}

// HELPERS

function random_string(min_len=5, max_len=50, skew=1, prob_space=0.2, source_str="abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.!?"){
    
    var str = ""
    var num_chars = randn_bm(min_len, max_len, skew)
    
    for(var i=num_chars; i>0; i--){
        
        space_gen = Math.random()
        
        if(space_gen<prob_space){
            str += " "
        } else {
            str += source_str[Math.floor(Math.random()*source_str.length)]
        }
        
    }
    
    return str
}

function array_pick_random(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}

function randn_bm(min, max, skew) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}

function generate_positioning_class_str(){
    
    function random_bg_class(){
        return array_pick_random([
            'bg-primary',
            'bg-secondary',
            'bg-success',
            'bg-danger',
            'bg-warning',
            'bg-info',
            'bg-light',
            'bg-dark',
            'bg-white'
        ])
    }
    
    // Margin
    let margin = 'm' + array_pick_random(['t', 'b', 'l', 'r', 'x', 'y', '']) + '-' + array_pick_random(['0', '1', '2', '3', '4', '5', 'auto'])
    
    // Padding
    let padding = 'p' + array_pick_random(['t', 'b', 'l', 'r', 'x', 'y', '']) + '-' + array_pick_random(['0', '1', '2', '3', '4', '5', 'auto'])
    
    // Sizing
    let sizing = 'w-' + array_pick_random(['25', '50', '75', '100'])
    
    // Floating
    floating = array_pick_random(['float-left', 'float-right'])
    
    // Combine and return
    return margin + ' ' + padding + ' ' + sizing + ' ' + floating
    
}