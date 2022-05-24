$(function() {
    var layer = layui.layer;
    var form = layui.form;
    initArtCateList();
    // 获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlstr = template('tpl-table', res);
                $('tbody').html(htmlstr);
            }
        })
    }
    // 为添加类别绑定点击事件
    var indexAdd = null;
    $('#btnAddCate').on('click', function() {
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html()
            })
        })
        // 通过代理形式为form表单绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('错误新增分类')
                    }
                    initArtCateList();
                    layer.msg('新增分类成功');
                    layer.close(indexAdd);
                    // 根据索引关闭对应的弹出层
                }
            })
        })
        // 通过代理为 编辑按钮绑定点击事件
    var indexedit = null;
    $('tbody').on('click', '.btn-edit', function(res) {
            indexedit = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '修改文章分类',
                content: $('#dialog-edit').html()
            })
            var id = $(this).attr('data-id');
            // 发起请求获取对应分类的数据
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    form.val('form-edit', res.data)
                }
            })
        })
        // 通过代理为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('更新数据失败')
                    }
                    layer.msg('更新成功');
                    layer.close(indexedit);
                    initArtCateList();
                }
            })
        })
        // 通过代理为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function(res) {
        var id = $(this).attr('data-id');
        // 提示用户是否删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    initArtCateList();
                }
            })
        });
    })
})