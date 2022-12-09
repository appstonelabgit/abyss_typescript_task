import React from "react"
import color from "../../Constants/color"
import Buttons from "../Buttons/Buttons"


type objProps = {
  name: string,
  level: number,
  value: string,
  is_edit: Boolean,
  color: string,
  children: objProps[]
}

function Tree() {

  //All State Start From Here
  const [obj_ref, setObj_ref] = React.useState<objProps>({
    name: "level_1",
    level: 1,
    value: 'Category',
    is_edit: false,
    color: color[0],
    children: []
  })
  // All State End Here

  //All Function For Category Start
  function add(obj: objProps, parent_obj: objProps) {
    const level = (obj?.level + 1);
    const color_val: string = color[obj.level];
    console.log(parent_obj, level, color_val)
    obj.children.push({
      name: parent_obj.name + '_' + (parent_obj.children.length + 1),
      level: level,
      color: color_val,
      value: "",
      is_edit: true,
      children: []
    })
    setObj_ref((data) => { return { ...data } })

  }
  function close(parent_obj: objProps, idx: Number) {
    parent_obj.children = parent_obj.children.filter((data, id) => id != idx)
    setObj_ref((data) => { return { ...data } })
  }
  function confirm(obj: objProps) {
    if (obj.value) {
      obj.is_edit = false;
      setObj_ref((data) => { return { ...data } })
    }
  }
  function cancle(parent_obj: objProps, idx: Number) {
    parent_obj.children = parent_obj.children.filter((data, id) => id != idx)
    setObj_ref((data) => { return { ...data } })
  }
  function edit(obj: objProps) {
    let val = prompt("Enter Edited Value", obj?.value);
    while (!val) {
      val = prompt("Enter Edited Value", obj?.value);
    }
    obj.value = val;
    setObj_ref((data) => { return { ...data } })
  }
  function recursion_ui(obj: objProps) {
    return obj?.children?.map((data: objProps, idx) => {
      return <li>
        <div className="category_main_div" >
          <div className="category_main_value_div">
            <div className="category_value" style={{ background: `${obj.color}` }}>
              {!data.is_edit ? data.value : <input type="text" className="input_focus" autoFocus={true} onChange={(e) => data.value = e.target.value}></input>}
            </div>
          </div>
          <Buttons confirm={confirm} add={add} obj={data} edit={edit} close={close} parent_obj={obj} cancle={cancle} idx={idx} />
        </div>

        {data?.children?.length != 0 ? <ul>
          {
            recursion_ui(data)
          }
        </ul> : null}
      </li>

    })
  }
  //All Function For Category End




  return <div className="container">
    <div className="row">
      <div className="tree" id="dragMe">
        <ul id="parent_ul">
          <li>
            <div className="category_main_div">
              <div className="category_main_value_div">
                <div className="category_value" style={{ background: "#439A97" }}>
                  Category
                </div>
              </div>
              <Buttons confirm={confirm} add={add} obj={obj_ref} edit={edit} close={close} parent_obj={obj_ref} cancle={cancle} idx={0} />
            </div>

            {obj_ref.children.length != 0 ? <ul>
              {
                recursion_ui(obj_ref)
              }
            </ul> : null}
          </li>
        </ul>

      </div>
    </div>
  </div>
}

export default Tree